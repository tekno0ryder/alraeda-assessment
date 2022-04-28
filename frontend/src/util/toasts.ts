import { ToastOptions } from "@ionic/react";
import { HookOverlayOptions } from "@ionic/react/dist/types/hooks/HookOverlayOptions";

type ToastType = ToastOptions & HookOverlayOptions;

const success = (message: string, options: ToastType = {}): ToastType => {
  return {
    message: message,
    duration: 1500,
    color: "success",
    ...options,
  };
};

const error = (message: string, options: ToastType = {}): ToastType => {
  return {
    message: message,
    duration: 2000,
    color: "danger",
    ...options,
  };
};

export default { error, success };
