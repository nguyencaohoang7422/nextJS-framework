export interface ThemeColors {
  primary: string;
  primaryLighten: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  error: string;
  link: string;
  disabled: string;
  border: string;
  background: string;
  iconGrey: string;
  [key: string]: string;
}

export const DefaultTheme: ThemeColors = {
  primary: "#2A80C3",
  primaryLighten: "#e8f3fc",
  secondary: "#00153b",
  success: "#07bc0c",
  warning: "#FFCC48",
  danger: "#CD1111",
  error: "#ff4d4f",
  link: "#2a80c3",
  disabled: "#717F87",
  border: "#E1E3E5",
  background: "#f6f6f6",
  iconGrey: "#8F9AA1",
};
