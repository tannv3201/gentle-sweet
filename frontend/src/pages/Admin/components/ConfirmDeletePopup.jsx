import React from "react";
import GButton from "../../../components/MyButton/MyButton";
import GModal from "../../../common/GModal/GModal";

function ConfirmDeletePopup({
    handleClose,
    handleOpen,
    isOpen,
    deleteQuestion,
    deleteLabel,
    handleDelete,
}) {
    return (
        <>
            <GModal
                handleClose={() => {
                    handleClose();
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title="Xác nhận"
            >
                <div>
                    <div style={{ padding: "12px 0" }}>
                        {deleteQuestion}
                        {"  "}
                        <span
                            style={{
                                fontWeight: "var(--fw-semi-bold)",
                                color: "red",
                            }}
                        >
                            {deleteLabel}
                        </span>
                        {"  "}?
                    </div>
                    <div style={{ paddingTop: "24px" }}>
                        <GButton color={"error"} onClick={handleDelete}>
                            Xác nhận
                        </GButton>
                        <GButton
                            color={"text"}
                            style={{ marginLeft: "12px" }}
                            onClick={handleClose}
                        >
                            Hủy
                        </GButton>
                    </div>
                </div>
            </GModal>
        </>
    );
}

export default ConfirmDeletePopup;
