import { toast } from 'vue-sonner';

export const displayToast = (message) => {
    toast.promise(() => new Promise((resolve) => setTimeout(resolve, 250)), {
        success: () => message,
    });
};