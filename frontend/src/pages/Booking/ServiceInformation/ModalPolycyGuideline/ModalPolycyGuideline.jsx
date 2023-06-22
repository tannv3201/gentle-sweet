import React from "react";
import classNames from "classnames/bind";
import styles from "./ModalPolycyGuideline.module.scss";
import { Grid } from "@mui/material";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GModal from "../../../../components/GModal/GModal";
import { IconButton } from "@mui/material";

import { QuestionMarkRounded } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { LightTooltip } from "../../../../components/GTooltip/GTooltip";
import Policy from "../../../Policy/Policy";
const cx = classNames.bind(styles);

const guidelines = [
    {
        title: "Hướng dẫn đặt lịch",
        content: [
            "Để đặt lịch, bạn cần đăng nhập và thực hiện qua hệ thống đặt lịch trực tuyến của chúng tôi.",
            "Yêu cầu đặt lịch cần được gửi trước ít nhất 24 giờ trước ngày hẹn dự kiến để đảm bảo khả năng xếp lịch của chúng tôi.",
            "Sau khi xác nhận đặt lịch thành công, bạn sẽ nhận được xác nhận đặt lịch qua email hoặc tin nhắn.",
        ],
    },
    {
        title: "Chính sách hủy lịch",
        content: [
            "Nếu bạn cần hủy lịch, vui lòng thông báo cho chúng tôi ít nhất 24 giờ trước ngày hẹn dự kiến.",
            "Chúng tôi dành 24h để chắc chắn lịch hẹn có thể được tiến hành. Sau 24h và trạng thái lịch hẹn là Đã lên lịch thì sẽ không thể hủy",
            "Trong trường hợp bất đắc dĩ, hãy liên hệ trực tiếp qua số điện thoại của chúng tôi để được hỗ trợ",
        ],
    },
    {
        title: "Chúng tôi khuyến khích bạn đọc kỹ và hiểu rõ các chính sách và quy định đặt/hủy lịch trước khi sử dụng dịch vụ của chúng tôi để tránh những bất tiện không đáng có.",
        epilogue: true,
    },
];

function ModalPolycyGuideline({ handleClose, handleOpen, isOpen }) {
    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

    const toggleDrawer = React.useCallback(
        () => setIsOpenDrawer((prevOpen) => !prevOpen),
        [setIsOpenDrawer]
    );
    return (
        <>
            <GModal
                handleClose={handleClose}
                handleOpen={handleOpen}
                isOpen={isOpen}
                title="Chính sách và hướng dẫn"
            >
                <div className={cx("modal-wrapper")}>
                    <Policy />
                </div>
            </GModal>
            {/* <Box
                sx={{
                    position: "fixed",
                    right: "16px",
                    bottom: "80px",
                    zIndex: 10,
                }}
            >
                <LightTooltip placement="left" title="Hướng dẫn">
                    <IconButton
                        size="medium"
                        style={{
                            border: "1px solid var(--primary-500)",
                            backgroundColor: "var(--white)",
                        }}
                        onClick={handleOpen}
                    >
                        <QuestionMarkRounded
                            style={{ color: "var(--primary-500)" }}
                        />
                    </IconButton>
                </LightTooltip>
            </Box> */}
        </>
    );
}

export default ModalPolycyGuideline;
