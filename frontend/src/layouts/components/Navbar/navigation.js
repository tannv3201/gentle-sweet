import { useSelector } from "react-redux";
import images from "../../../assets/images";

export const MenuList = [
    {
        name: "Trang chủ",
        to: "/",
    },
    {
        name: "Giới thiệu",
        children: [
            { name: "Gentle Beauty", to: "/ve-chung-toi" },
            {
                name: "Hệ thống chi nhánh",
                to: "/he-thong-chi-nhanh",
            },
        ],
        to: "",
    },
    {
        name: "Tin tức",
        to: "/tin-tuc",
    },
    {
        name: "Store",
        to: "/san-pham",
    },
];
