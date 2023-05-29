import React, { useEffect } from "react";

import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function GPagination({
    showFirstButton,
    showLastButton,
    count,
    currentPage,
    setCurrentPage,
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const [searchPage, setSearchPage] = useState(
        searchParams.get("page") || null
    );

    // useEffect(() => {
    //     if (location.search) {
    //         setCurrentPage(searchPage);
    //     }
    // }, [searchPage]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
        const newSearchParams = new URLSearchParams(location.search);
        newSearchParams.set("page", value);
        setSearchParams(newSearchParams);
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
                page={currentPage}
                onChange={handleChange}
            />
        </div>
    );
}
