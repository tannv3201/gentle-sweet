import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
    0: "0.0",
    1: "1.0",
    2: "2.0",
    3: "3.0",
    4: "4.0",
    5: "5.0",
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function GRating({
    value,
    valueTotal,
    ratingQuantity,
    ...props
}) {
    const [hover, setHover] = React.useState(-1);
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Rating
                {...props}
                value={value}
                precision={1}
                getLabelText={getLabelText}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
            />
            {value > 0 && <p style={{ marginLeft: "6px" }}>{valueTotal}</p>}
            <p style={{ marginLeft: "6px" }}>| {ratingQuantity} đánh giá</p>
        </div>
    );
}
