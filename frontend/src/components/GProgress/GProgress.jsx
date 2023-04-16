import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function GProgress({ isLoading }) {
    return (
        isLoading && (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    zIndex: 1000,
                }}
            >
                <div
                    style={{
                        position: "fixed",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <CircularProgress style={{ color: "var(--primary)" }} />
                </div>
            </div>
        )
    );
}
