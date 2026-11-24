export interface AppTheme {
    colors: {
        background: string;
        surface: string;
        text: string;
        muted: string;
        primary: string;
        primaryHover: string;
        onPrimary: string;
        secondary: string;
        secondaryHover: string;
        danger: string;
        dangerHover: string;
        onDanger: string;
        border: string;
        success: string;
        focus: string;
        shadow: string;
    };
    radius: {
        sm: string;
        md: string;
        lg: string;
    };
    space: (n: number) => string;
}

export const light: AppTheme = {
    colors: {
        background: "#eff7ff",
        surface: "#ffffff",
        text: "#243b53",
        muted: "#64748b",
        primary: "#a8d5ff",
        primaryHover: "#87c2f5",
        onPrimary: "#243b53",
        secondary: "#e0efff",
        secondaryHover: "#cce4ff",
        danger: "#ffc4c4",
        dangerHover: "#ffa8a8",
        onDanger: "#7f1d1d",
        border: "#d0e3f5",
        success: "#287a50",
        focus: "#397bb5",
        shadow: "rgba(0, 0, 0, 0.08)",
    },
    radius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
    },
    space: (n) => `${n * 4}px`,
};

export const dark: AppTheme = {
    colors: {
        background: "#172331",
        surface: "#243447",
        text: "#eaf4ff",
        muted: "#b0c4d8",
        primary: "#a8d5ff",
        primaryHover: "#87c2f5",
        onPrimary: "#243b53",
        secondary: "#354b63",
        secondaryHover: "#45617d",
        danger: "#ffc4c4",
        dangerHover: "#ffa8a8",
        onDanger: "#7f1d1d",
        border: "#40566e",
        success: "#a5e5bb",
        focus: "#a8d5ff",
        shadow: "rgba(0, 0, 0, 0.2)",
    },
    radius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
    },
    space: (n) => `${n * 4}px`,
};

export const pink: AppTheme = {
    colors: {
        background: "#fff0f5",
        surface: "#ffffff",
        text: "#593647",
        muted: "#805d70",
        primary: "#f5bcd5",
        primaryHover: "#efa5c5",
        onPrimary: "#593647",
        secondary: "#fce0ed",
        secondaryHover: "#f8cfe2",
        danger: "#ffc4c4",
        dangerHover: "#ffa8a8",
        onDanger: "#7f1d1d",
        border: "#efd0df",
        success: "#287a50",
        focus: "#b85485",
        shadow: "rgba(0, 0, 0, 0.08)",
    },
    radius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
    },
    space: (n) => `${n * 4}px`,
};