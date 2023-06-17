export const FormatCurrency = (price) => {
    const parsedPrice = parseFloat(price);
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(parsedPrice);
};
