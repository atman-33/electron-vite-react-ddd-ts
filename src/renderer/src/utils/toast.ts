import { toast } from 'sonner';

export const showToastSuccess = (message: string, duration = 2000) => {
  toast.success(message, {
    closeButton: false,
    duration,
    position: 'bottom-center'
  });
};

export const showToastError = (message: string, duration = 2000) => {
  toast.error(message, {
    closeButton: false,
    duration,
    position: 'bottom-center'
  });
};
