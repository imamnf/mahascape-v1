export interface DState<T = Array<Record<string, unknown>>> {
  error: boolean;
  loading: boolean;
  show: boolean;
  success: boolean;
  data: T;
}

export interface State {
  error: boolean;
  loading: boolean;
  show: boolean;
  success: boolean;
}

export interface AuthState {
  error: boolean;
  loading: boolean;
  show: boolean;
  success: boolean;
  message: {
    error: string;
    success: string;
  };
}
