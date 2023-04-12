import React from "react";
import { Radio } from "@mui/material";

function MyRadio({ id, name, label, ...props }) {
    return (
        <div style={{ width: "100%", padding: 0 }}>
            <Radio
                id={id}
                style={{
                    color: "var(--primary)",
                }}
                // color="primary"
                name={name}
                {...props}
            />
            <label htmlFor={id}>{label}</label>
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
