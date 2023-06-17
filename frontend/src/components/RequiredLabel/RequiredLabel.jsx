import React from "react";

function RequiredLabelWrapper({ label }) {
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

export default RequiredLabelWrapper;

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
