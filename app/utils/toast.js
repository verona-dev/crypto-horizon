import { toast } from 'vue-sonner';

export const displayToast = (message) => {
    toast.promise(() => new Promise((resolve) => setTimeout(resolve, 250)), {
        success: () => message,
    });
};

export const displayCustomToast = (username, astronaut_type) => {
    username && !astronaut_type && displayToast('Username changed successfully.');
    astronaut_type && !username && displayToast('Astronaut type updated successfully.');
    username && astronaut_type && displayToast('Username and astronaut type changed successfully.');
};