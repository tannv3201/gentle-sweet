import React from "react";

function RequiredLabel({ label }) {
    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {label}{" "}
            <span
                style={{
                    color: "red",
                    fontWeight: "var(--fw-semi-bold)",
                    marginLeft: "4px",
                    fontSize: "2rem",
                }}
            >
                *
            </span>
        </div>
    );
}

export default RequiredLabel;

export const RequiredMark = () => {
    return (
        <span
            style={{
                color: "red",
                fontWeight: "var(--fw-semi-bold)",
                marginLeft: "4px",
                fontSize: "2rem",
            }}
        >
            *
        </span>
    );
};
