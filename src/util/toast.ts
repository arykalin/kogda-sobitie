import {toastController} from "@ionic/vue";

export function showToast(message, color) {
    const toast = toastController
        .create({
            message: message,
            duration: 1500,
            color: color,
        })
    return toast;
}

