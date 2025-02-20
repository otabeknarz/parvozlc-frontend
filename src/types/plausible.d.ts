interface Window {
  plausible?: (
    eventName: string,
    options?: {
      callback?: () => void;
      props?: Record<string, string | number | boolean>;
    }
  ) => void;
} 