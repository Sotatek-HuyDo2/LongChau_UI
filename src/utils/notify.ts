import { ToastOptions, toast } from 'react-toastify';

export type NOTIFY_TYPE = 'success' | 'warning' | 'error';
function addToast(type: NOTIFY_TYPE, message: string, options?: ToastOptions) {
  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'warning':
      toast.warning(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
  }
}

export function toastSuccess(message: string, options?: ToastOptions) {
  addToast('success', message, options);
}

export function toastWarning(message: string, options?: ToastOptions) {
  addToast('warning', message, options);
}

export function toastError(message: string, options?: ToastOptions) {
  addToast('error', message, options);
}
