import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import classNames from "classnames/bind";
import styles from "./GRating.module.scss";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const cx = classNames.bind(styles);

const labels = {
    1: "Tệ",
    2: "Không tốt",
    3: "Trung bình",
    4: "Tốt",
    5: "Tuyệt vời",
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function GRrating({ quantitylabel = false }) {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const [value, setValue] = React.useState(5);
    const [hover, setHover] = React.useState(-1);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <span
                className={
                    isMedium
                        ? cx("label-rating", "isSmall")
                        : cx("label-rating")
                }
            >
                Đánh giá:
            </span>
            <Rating
                size="small"
                name="hover-feedback"
                value={value}
                precision={1}
                style={{ marginRight: 4 }}
                // getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="small" />
                }
            />
            <div className={cx("rating-count")}>
                {quantitylabel && (
                    <span>
                        20,3k
                        <span
                            className={
                                isSmall
                                    ? cx("unit-name", "isSmall")
                                    : cx("unit-name")
                            }
                        >
                            Đánh giá
                        </span>
                    </span>
                )}
            </div>
            {/* {value !== null && (
                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )} */}
        </Box>
    );
}
