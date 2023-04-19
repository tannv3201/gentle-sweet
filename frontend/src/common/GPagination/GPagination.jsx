import * as React from "react";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function GPagination({
    showFirstButton,
    showLastButton,
    count,
}) {
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* <span style={{ fontSize: "1.4rem" }}>Trang: {page}</span> */}
            <Pagination
                showFirstButton={showFirstButton}
                showLastButton={showLastButton}
                count={count}
                page={page}
                onChange={handleChange}
            />
        </div>
    );
}
