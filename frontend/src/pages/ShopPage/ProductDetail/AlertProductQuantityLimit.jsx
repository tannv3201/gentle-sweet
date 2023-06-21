import React from "react";

import GModal from "../../../components/GModal/GModal";
import GButton from "../../../components/MyButton/MyButton";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function AlertProductQuantityLimit({
    handleClose,
    handleOpen,
    isOpen,
    productQuantityInCart,
}) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <>
            <GModal
                handleClose={handleClose}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title="Số lượng sản phẩm"
            >
                <div
                    style={{
                        padding: isSmall ? "12px 8px 8px" : "0 8px",
                        width: isSmall ? "" : "520px",
                    }}
                >
                    <div>
                        Bạn đã có{" "}
                        <span
                            style={{
                                fontWeight: "var(--fw-medium)",
                                color: "var(--primary-500)",
                            }}
                        >
                            {productQuantityInCart}
                        </span>{" "}
                        sản phẩm trong giỏ hàng. Không thể thêm số lượng đã chọn
                        vào giỏ hàng vì sẽ vượt quá giới hạn mua hàng của bạn.
                    </div>
                    <br />
                    <GButton onClick={() => handleClose()} color={"success"}>
                        OK
                    </GButton>
                </div>
            </GModal>
        </>
    );
}

export default AlertProductQuantityLimit;
