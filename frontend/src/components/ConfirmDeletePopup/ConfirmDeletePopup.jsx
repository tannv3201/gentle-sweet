import React from "react";
import GModal from "../../common/GModal/GModal";
import GButton from "../MyButton/MyButton";

function ConfirmDeletePopup({
    handleClose,
    handleOpen,
    isOpen,
    deleteQuestion,
    deleteLabel,
    handleDelete,
    confimQuestion1,
    confimQuestion2,
    title,
}) {
    return (
        <>
            <GModal
                handleClose={() => {
                    handleClose();
                }}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title={title ? title : "Xác nhận"}
            >
                <div>
                    <div style={{ padding: "12px 0" }}>
                        {deleteQuestion}
                        {"  "}
                        {confimQuestion1 && <span>{confimQuestion1}</span>}
                        {confimQuestion1 && confimQuestion2 && <br />}
                        {confimQuestion2 && <span>{confimQuestion2}</span>}
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
