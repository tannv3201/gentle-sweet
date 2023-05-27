import React from "react";
import classNames from "classnames/bind";
import styles from "./ModalPolycyGuideline.module.scss";
import { Grid } from "@mui/material";

import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GModal from "../../../../common/GModal/GModal";
import { IconButton } from "@mui/material";

import { MenuRounded, QuestionMarkRounded } from "@mui/icons-material";
import Box from "@mui/material/Box";
import { LightTooltip } from "../../../../components/GTooltip/GTooltip";
const cx = classNames.bind(styles);

const guidelines = [
    {
        title: "Hướng dẫn đặt lịch",
        content: [
            "Để đặt lịch, bạn cần thực hiện qua hệ thống đặt lịch trực tuyến của chúng tôi hoặc gửi yêu cầu đặt lịch qua biểu mẫu liên hệ trên trang web của chúng tôi.",
            "Yêu cầu đặt lịch cần được gửi trước ít nhất 24 giờ trước ngày hẹn dự kiến để đảm bảo khả năng xếp lịch của chúng tôi.",
            "Sau khi xác nhận đặt lịch thành công, bạn sẽ nhận được xác nhận đặt lịch qua email hoặc tin nhắn.",
        ],
    },
    {
        title: "Hướng dẫn hủy lịch",
        content: [
            "Nếu bạn cần hủy lịch, vui lòng thông báo cho chúng tôi ít nhất 24 giờ trước ngày hẹn dự kiến.",
            "Hủy lịch muộn hơn 24 giờ có thể dẫn đến mất phí hủy hoặc không hoàn lại tiền đặt cọc (nếu có).",
            "Trong trường hợp không xuất hiện (no-show) mà không thông báo trước, chúng tôi có thể áp dụng phí hủy lịch hoặc không hoàn lại tiền đặt cọc (nếu có).",
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
                    <Grid container spacing={3}>
                        {guidelines
                            ?.filter((policy) => policy?.epilogue !== true)
                            .map((item, idx) => (
                                <Grid key={idx} item xs={12}>
                                    <div className="">
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <span
                                                    className={cx(
                                                        "policy-title"
                                                    )}
                                                >
                                                    <h2>{item?.title}</h2>
                                                </span>
                                            </Grid>
                                            <ol className={cx("policy-list")}>
                                                {item?.content?.map(
                                                    (child, idx) => (
                                                        <li
                                                            key={idx}
                                                            className={cx(
                                                                "policy-item"
                                                            )}
                                                        >
                                                            <span>{child}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ol>
                                        </Grid>
                                    </div>
                                </Grid>
                            ))}
                    </Grid>
                </div>
            </GModal>
            <Box
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
            </Box>
        </>
    );
}

export default ModalPolycyGuideline;
