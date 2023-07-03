import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

export default function BasicRating({ name, value, getLabelText, ...props }) {
    const [hover, setHover] = React.useState(-1);

    return (
        <Rating
            {...props}
            size="small"
            name="hover-feedback"
            value={value}
            precision={1}
            style={{ marginRight: 4 }}
            getLabelText={getLabelText}
            onChangeActive={(event, newHover) => {
                setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="small" />}
        />
    );
}
