export const getCurrentPage = (list, page, size) => {
    const startIndex = (page - 1) * size;
    const endIndex = startIndex + size;
    return list?.slice(startIndex, endIndex);
};
