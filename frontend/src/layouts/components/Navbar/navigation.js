import { useSelector } from "react-redux";
import images from "../../../assets/images";

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
    // {
    //     title: "Dịch vụ",
    //     children: [
    //         {
    //             title: "Dịch vụ tóc",
    //             children: [
    //                 {
    //                     title: "Cắt tóc",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Uốn tóc",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Nhuộm tóc",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Duỗi tóc",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Ép tóc",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Trị rụng tóc",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Gội đầu massage",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Phục hồi tóc",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //             ],
    //             isOpen: false,
    //             href: "/cham-soc-toc",
    //         },
    //         {
    //             title: "Dịch vụ nails",
    //             children: [
    //                 {
    //                     title: "Sơn ombre",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Sơn french",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Nhúng bột nails",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Vẽ móng",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Massage tay chân",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Chà hồng gót chân",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Vẽ móng",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //                 {
    //                     title: "Massage tay chân",
    //                     href: "#",
    //                     image: images.hair_chemistry_service,
    //                 },
    //             ],
    //             href: "#",
    //             isOpen: false,
    //         },
    //     ],
    //     isOpen: false,
    //     href: "/dich-vu",
    // },
    {
        title: "Tin tức",
        isOpen: false,
        href: "/tin-tuc",
    },
    {
        title: "Store",
        href: "/san-pham",
        isOpen: false,
    },
    {
        title: "Đặt lịch",
        href: "/dat-lich",
        isOpen: false,
    },
];
