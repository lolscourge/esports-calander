export const sanitizeGameName = (gameName) => {
    return (gameName.toLowerCase() || "")
        .replace(/\s+/g, '-')  // Replace spaces with hyphens
        .replace(/[^\w-]/g, '');  // Remove special characters
};