export interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  allows_write_to_pm?: boolean;
  photo_url?: string;
}

export interface TelegramChat {
  id: number;
  type: string;
  title?: string;
  username?: string;
  photo_url?: string;
}

export interface TelegramThemeParams {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
  secondary_bg_color?: string;
}

export interface TelegramMainButton {
  text: string;
  color: string;
  textColor: string;
  isVisible: boolean;
  isProgressVisible: boolean;
  isActive: boolean;
  setText: (text: string) => void;
  onClick: (cb: () => void) => void;
  show: () => void;
  hide: () => void;
  enable: () => void;
  disable: () => void;
  showProgress: (leaveActive?: boolean) => void;
  hideProgress: () => void;
}

export interface TelegramBackButton {
  isVisible: boolean;
  onClick: (cb: () => void) => void;
  show: () => void;
  hide: () => void;
}

export interface TelegramViewportChangedEvent {
  isStateStable: boolean;
  height: number;
  stableHeight: number;
  width: number;
}

// Возможные события Telegram WebApp
export type TelegramEventName =
  | "themeChanged"
  | "viewportChanged"
  | "mainButtonClicked"
  | "backButtonClicked"
  | "popupClosed"
  | "settingsChanged"
  | string; // оставляем string на случай других событий

export type TelegramEventCallback<T = unknown> = (event: T) => void;

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    query_id?: string;
    user?: TelegramUser;
    receiver?: TelegramUser;
    chat?: TelegramChat;
    chat_type?: string;
    chat_instance?: string;
    start_param?: string;
    can_send_after?: number;
    auth_date?: string;
    hash?: string;
  };
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: TelegramThemeParams;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  BackButton: TelegramBackButton;
  MainButton: TelegramMainButton;

  expand: () => void;
  close: () => void;
  ready: () => void;
  disableVerticalSwipes: () => void;

  showAlert: (message: string, cb?: () => void) => void;
  showConfirm: (message: string, cb?: (confirmed: boolean) => void) => void;

  onEvent: <T = unknown>(
    event: TelegramEventName,
    cb: TelegramEventCallback<T>
  ) => void;
  offEvent: <T = unknown>(
    event: TelegramEventName,
    cb: TelegramEventCallback<T>
  ) => void;

  setHeaderColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;

  enableClosingConfirmation: () => void;
  disableClosingConfirmation: () => void;
}

// --- Глобальный window.Telegram ---
declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

// Превращаем файл в модуль, чтобы можно было импортировать типы
export {};
