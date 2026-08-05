import confirmStore from "../../store/confirmStore.js";

export default function useConfirmBox() {

    const {
        isOpen,
        title,
        message,
        callback,
        close,
        open
    } = confirmStore();

    return {
        isOpen,
        title,
        message,
        callback,
        close,
        open
    };
}