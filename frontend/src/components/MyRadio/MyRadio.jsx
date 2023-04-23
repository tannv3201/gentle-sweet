import React from "react";
import { Radio } from "@mui/material";

function MyRadio({ id, name, label, onChange, checked, ...props }) {
    return (
        <div
            style={{
                width: "100%",
                padding: 0,
                display: "flex",
                alignItems: "center",
            }}
        >
            <Radio
                id={id}
                style={{
                    color: "var(--primary-500)",
                    marginRight: "4px",
                }}
                // color="primary"
                name={name}
                {...props}
                onChange={onChange}
                checked={checked}
            />
            <label style={{ userSelect: "none" }} htmlFor={id}>
                {label}
            </label>
        </div>
    );
}
// function GroupRadio({ id, name, label }) {
//     return (
//         <div style={{ width: "100%", padding: 0 }}>
//             <MyRadio name={} />
//         </div>
//     );
// }

export default MyRadio;
