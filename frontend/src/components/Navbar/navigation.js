export const MenuList = [
    {
        title: "Trang chủ",
        href: "/",
    },
    {
        title: "Giới thiệu",
        children: [
            { title: "Gentle Beauty", href: "/ve-chung-toi" },
            {
                title: "Hệ thống chi nhánh",
                href: "/he-thong-chi-nhanh",
            },
        ],
        isOpen: false,
        href: "",
    },
    {
        title: "Dịch vụ",
        children: [
            {
                title: "Dịch vụ tóc",
                children: [
                    { title: "Cắt tóc", href: "#" },
                    { title: "Uốn tóc", href: "#" },
                    { title: "Nhuộm tóc", href: "#" },
                    { title: "Duỗi tóc", href: "#" },
                    { title: "Ép tóc", href: "#" },
                    { title: "Trị rụng tóc", href: "#" },
                    { title: "Gội đầu massage", href: "#" },
                    { title: "Phục hồi tóc", href: "#" },
                ],
                isOpen: false,
                href: "/cham-soc-toc",
            },
            {
                title: "Dịch vụ nails",
                children: [
                    { title: "Sơn ombre", href: "#" },
                    { title: "Sơn french", href: "#" },
                    { title: "Nhúng bột nails", href: "#" },
                    { title: "Vẽ móng", href: "#" },
                    { title: "Massage tay chân", href: "#" },
                    { title: "Chà hồng gót chân", href: "#" },
                    { title: "Vẽ móng", href: "#" },
                    { title: "Massage tay chân", href: "#" },
                ],
                href: "#",
                isOpen: false,
            },
        ],
        isOpen: false,
        href: "/dich-vu",
    },
    {
        title: "Tin tức",
        isOpen: false,
        href: "#",
    },
    {
        title: "Store",
        href: "",
        isOpen: false,
    },
];
