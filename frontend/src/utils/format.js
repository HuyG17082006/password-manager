export const formatDate = (date) => {
    if (!date) return "--/--/----";

    return new Date(date).toLocaleDateString("vi-VN");
};

export const truncate = (text, maxLength = 28) => {
    if (!text) return "-";

    return text.length > maxLength
        ? text.slice(0, maxLength) + "..."
        : text;
};
