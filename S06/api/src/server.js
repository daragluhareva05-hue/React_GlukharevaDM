const { randomUUID } = require('node:crypto');
const { mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } = require('node:fs');
const { dirname, join, resolve } = require('node:path');
const cors = require('cors');
const express = require('express');
const seed = require('./seed.json');

const STATUSES = new Set(['todo', 'doing', 'done']);
const dataFile = resolve(process.env.DATA_FILE || join(__dirname, '../data/db.json'));

function saveData(data) {
  const temporaryFile = `${dataFile}.${randomUUID()}.tmp`;
  try {
    writeFileSync(temporaryFile, `${JSON.stringify(data, null, 2)}\n`, { flag: 'wx' });
    renameSync(temporaryFile, dataFile);
  } finally {
    rmSync(temporaryFile, { force: true });
  }
}

function loadData() {
  try {
    return JSON.parse(readFileSync(dataFile, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    mkdirSync(dirname(dataFile), { recursive: true });
    saveData(seed);
    return seed;
  }
}

let data = loadData();
const userIds = new Set(data.users.map((user) => user.id));

function saveTasks(tasks) {
  const updated = { ...data, tasks };
  saveData(updated);
  data = updated;
}

function respondWithError(res, status, message) {
  return res.status(status).json({ message });
}

function validateTaskBody(req, res, next) {
  const body = req.body;
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return respondWithError(res, 400, 'Тело запроса должно быть JSON-объектом.');
  }
  if (Object.hasOwn(body, 'title') && (typeof body.title !== 'string' || !body.title.trim())) {
    return respondWithError(res, 400, 'Укажите непустое название задачи (title).');
  }
  if (Object.hasOwn(body, 'status') && !STATUSES.has(body.status)) {
    return respondWithError(res, 400, 'Допустимые статусы задачи: todo, doing, done.');
  }
  next();
}

const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => {
  res.json(data.users);
});

app.get('/tasks', (req, res) => {
  const { userId, status } = req.query;
  if (typeof userId !== 'string' || !userId.trim()) {
    return respondWithError(res, 400, 'Укажите один параметр userId.');
  }
  if (status !== undefined && !STATUSES.has(status)) {
    return respondWithError(res, 400, 'Допустимые статусы задачи: todo, doing, done.');
  }
  if (!userIds.has(userId)) {
    return respondWithError(res, 404, 'Участник не найден.');
  }

  const tasks = data.tasks.filter((task) => {
    return task.userId === userId && (status === undefined || task.status === status);
  });
  res.json(tasks);
});

app.param('id', (req, res, next, id) => {
  const index = data.tasks.findIndex((task) => task.id === id);
  if (index === -1) return respondWithError(res, 404, 'Задача не найдена.');
  res.locals.taskIndex = index;
  next();
});

app.get('/tasks/:id', (req, res) => {
  res.json(data.tasks[res.locals.taskIndex]);
});

app.post('/tasks', validateTaskBody, (req, res) => {
  const { userId, title, status = 'todo' } = req.body;
  if (typeof userId !== 'string' || !userId.trim()) {
    return respondWithError(res, 400, 'Укажите строковый ID участника (userId).');
  }
  if (title === undefined) {
    return respondWithError(res, 400, 'Укажите непустое название задачи (title).');
  }
  if (!userIds.has(userId)) {
    return respondWithError(res, 404, 'Участник не найден.');
  }

  const task = { id: randomUUID(), userId, title: title.trim(), status };
  saveTasks([...data.tasks, task]);
  res.location(`/tasks/${task.id}`).status(201).json(task);
});

app.patch('/tasks/:id', validateTaskBody, (req, res) => {
  const fields = Object.keys(req.body);
  if (fields.length === 0 || fields.some((field) => field !== 'title' && field !== 'status')) {
    return respondWithError(res, 400, 'Передайте title, status или оба поля.');
  }

  const index = res.locals.taskIndex;
  const task = { ...data.tasks[index] };
  const { title, status } = req.body;
  if (title !== undefined) task.title = title.trim();
  if (status !== undefined) task.status = status;

  const tasks = data.tasks.slice();
  tasks[index] = task;
  saveTasks(tasks);
  res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const tasks = data.tasks.slice();
  tasks.splice(res.locals.taskIndex, 1);
  saveTasks(tasks);
  res.status(204).end();
});

app.use((req, res) => {
  respondWithError(res, 404, 'Маршрут не найден.');
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.type === 'entity.parse.failed') {
    return respondWithError(res, 400, 'Некорректный JSON.');
  }
  if (error.status >= 400 && error.status < 500) {
    return respondWithError(res, error.status, 'Не удалось обработать запрос.');
  }
  console.error(error);
  respondWithError(res, 500, 'Внутренняя ошибка сервера.');
});

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT ?? 3001);
const server = app.listen(port, host, (error) => {
  if (error) {
    console.error(error);
    process.exitCode = 1;
    return;
  }
  console.log(`API запущен на http://${host}:${server.address().port}`);
});
