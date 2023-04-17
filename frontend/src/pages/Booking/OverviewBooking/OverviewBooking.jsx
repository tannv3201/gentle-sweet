import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./OverviewBooking.module.scss";
import { Grid, IconButton, StepButton } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
    MoreTimeRounded,
    HealthAndSafetyRounded,
    CachedRounded,
    AssignmentTurnedInRounded,
    ManageSearchRounded,
    PanToolAltRounded,
    MenuRounded,
    ClearAllRounded,
} from "@mui/icons-material";
import HorizontalNonLinearStepper from "../../../components/Stepper/HorizontalNonLinearStepper";
import VerticalLinearStepper from "../../../components/Stepper/VerticalLinearStepper";
import StepperBooking from "./StepperBooking/StepperBooking";

const cx = classNames.bind(styles);
const steps = [
    {
        label: "Select campaign settings",
        description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
        label: "Create an ad group",
        description:
            "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
        label: "Create an ad",
        description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
];

// const listService = [
//     {
//         categoryTitle: "Dịch vụ tóc",
//         childService: [
//             {
//                 title: "Cắt tóc",
//             },
//             {
//                 title: "Uốn tóc",
//             },
//             {
//                 title: "Nhuộm tóc",
//             },
//             {
//                 title: "Duỗi tóc",
//             },
//             {
//                 title: "Ép tóc",
//             },
//             {
//                 title: "Trị rụng tóc",
//             },
//             {
//                 title: "Gội đầu massage",
//             },
//             {
//                 title: "Phục hồi tóc",
//             },
//         ],
//     },
//     {
//         categoryTitle: "Dịch vụ nails",
//         childService: [
//             {
//                 title: "Sơn ombre",
//             },
//             {
//                 title: "Sơn french",
//             },
//             {
//                 title: "Nhúng bột nails",
//             },
//             {
//                 title: "Vẽ móng",
//             },
//             {
//                 title: "Massage tay chân",
//             },
//             {
//                 title: "Chà hồng gót chân",
//             },
//             {
//                 title: "Vẽ móng",
//             },
//             {
//                 title: "Massage tay chân",
//             },
//         ],
//     },
// ];

const policies = [
    {
        title: "Chính sách đặt lịch",
        content: [
            "Để đặt lịch, bạn cần thực hiện qua hệ thống đặt lịch trực tuyến của chúng tôi hoặc gửi yêu cầu đặt lịch qua biểu mẫu liên hệ trên trang web của chúng tôi.",
            "Yêu cầu đặt lịch cần được gửi trước ít nhất 24 giờ trước ngày hẹn dự kiến để đảm bảo khả năng xếp lịch của chúng tôi.",
            "Sau khi xác nhận đặt lịch thành công, bạn sẽ nhận được xác nhận đặt lịch qua email hoặc tin nhắn.",
        ],
    },
    {
        title: "Chính sách hủy lịch",
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

function OverviewBooking() {
    const [isOpenPolicy, setIsOpenPolicy] = useState(false);
    const [isOpenGuidelines, setIsOpenGuidelines] = useState(false);

    const handleOpenPolicy = () => {
        setIsOpenPolicy(!isOpenPolicy);
    };

    const handleOpenGuidelines = () => {
        setIsOpenGuidelines(!isOpenGuidelines);
    };
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <main className={cx("wrapper")}>
            <div className={cx("inner")}>
                {/* <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <span className={cx("ov-title")}>
                            <h2>
                                Cùng tham khảo và đặt lịch làm đẹp tại Gentle
                                Beauty ngay bây giờ !
                            </h2>
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                        <blockquote className={cx("ov-description")}>
                            <p>
                                Đặt lịch trước giúp bạn tiết kiệm thời gian và
                                dễ dàng trải nghiệm dịch vụ làm móng tay. Bạn có
                                thể đặt lịch trực tuyến hoặc qua biểu mẫu liên
                                hệ của chúng tôi. Việc đặt lịch trước đảm bảo
                                bạn có thời gian và ngày mong muốn, đồng thời
                                linh hoạt và thuận tiện cho nhu cầu của bạn.
                                Ngoài ra, việc quản lý lịch đặt trước cũng dễ
                                dàng, bạn có thể thay đổi hoặc hủy bỏ lịch đặt
                                trước theo sở thích của bạn.
                            </p>
                        </blockquote>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={cx("illustration-wrapper")}>
                            <div className={cx("illustration")}>
                                <MoreTimeRounded
                                    className={cx("illustration-icon")}
                                />
                                <span>Tiết kiệm thời gian</span>
                            </div>
                            <div className={cx("illustration")}>
                                <HealthAndSafetyRounded
                                    className={cx("illustration-icon")}
                                />
                                <span>Đảm bảo dịch vụ</span>
                            </div>
                            <div className={cx("illustration")}>
                                <CachedRounded
                                    className={cx("illustration-icon")}
                                />
                                <span>Thuận tiện và linh hoạt</span>
                            </div>
                            <div className={cx("illustration")}>
                                <AssignmentTurnedInRounded
                                    className={cx("illustration-icon")}
                                />
                                <span>Xác nhận chính xác</span>
                            </div>
                            <div className={cx("illustration")}>
                                <ManageSearchRounded
                                    className={cx("illustration-icon")}
                                />
                                <span>Quản lý dễ dàng</span>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div
                            className={
                                isOpenPolicy
                                    ? cx(
                                          "policies-guidelines-wrapper",
                                          "isOpen"
                                      )
                                    : cx("policies-guidelines-wrapper")
                            }
                        >
                            <span
                                onClick={handleOpenPolicy}
                                className={cx("policies-guidelines-title")}
                            >
                                <h2>Xem chính sách của chúng tôi</h2>
                                <IconButton onClick={handleOpenPolicy}>
                                    {isOpenPolicy ? (
                                        <ClearAllRounded />
                                    ) : (
                                        <MenuRounded />
                                    )}
                                </IconButton>
                            </span>
                            <div
                                className={
                                    isOpenPolicy
                                        ? cx(
                                              "policies-guidelines-content",
                                              "isOpen"
                                          )
                                        : cx("policies-guidelines-content")
                                }
                            >
                                <Grid container>
                                    <Grid item xs={12}>
                                        <div className={cx("policy")}>
                                            <Grid container>
                                                {policies
                                                    ?.filter(
                                                        (policy) =>
                                                            policy?.epilogue !==
                                                            true
                                                    )
                                                    .map((policy, index) => (
                                                        <Grid item xs={6}>
                                                            <div
                                                                className={cx(
                                                                    "policy-item-wrapper"
                                                                )}
                                                            >
                                                                <Grid
                                                                    key={index}
                                                                    container
                                                                    spacing={1}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
                                                                        <span
                                                                            className={cx(
                                                                                "policy-child-title"
                                                                            )}
                                                                        >
                                                                            <h3>
                                                                                {
                                                                                    policy.title
                                                                                }
                                                                            </h3>
                                                                        </span>
                                                                    </Grid>
                                                                    {policy?.content?.map(
                                                                        (
                                                                            content,
                                                                            index
                                                                        ) => (
                                                                            <Grid
                                                                                item
                                                                                xs={
                                                                                    12
                                                                                }
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <div
                                                                                    className={cx(
                                                                                        "policy-content-item"
                                                                                    )}
                                                                                >
                                                                                    <PanToolAltRounded
                                                                                        style={{
                                                                                            transform:
                                                                                                "rotate(90deg)",
                                                                                            color: "var(--primary-500)",
                                                                                        }}
                                                                                    />
                                                                                    <span>
                                                                                        {
                                                                                            content
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            </Grid>
                                                                        )
                                                                    )}
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                    ))}
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div
                            className={
                                isOpenGuidelines
                                    ? cx(
                                          "policies-guidelines-wrapper",
                                          "isOpen"
                                      )
                                    : cx("policies-guidelines-wrapper")
                            }
                        >
                            <span
                                onClick={handleOpenGuidelines}
                                className={cx("policies-guidelines-title")}
                            >
                                <h2>Hướng dẫn đặt lịch</h2>
                                <IconButton onClick={handleOpenGuidelines}>
                                    {isOpenGuidelines ? (
                                        <ClearAllRounded />
                                    ) : (
                                        <MenuRounded />
                                    )}
                                </IconButton>
                            </span>
                            <div className={cx("policies-guidelines-content")}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <div className={cx("policy")}>
                                            <Grid container>
                                                {guidelines
                                                    ?.filter(
                                                        (guide) =>
                                                            guide?.epilogue !==
                                                            true
                                                    )
                                                    .map((guide, index) => (
                                                        <Grid item xs={6}>
                                                            <div
                                                                className={cx(
                                                                    "policy-item-wrapper"
                                                                )}
                                                            >
                                                                <Grid
                                                                    key={index}
                                                                    container
                                                                    spacing={1}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
                                                                        <span
                                                                            className={cx(
                                                                                "policy-child-title"
                                                                            )}
                                                                        >
                                                                            <h3>
                                                                                {
                                                                                    guide.title
                                                                                }
                                                                            </h3>
                                                                        </span>
                                                                    </Grid>
                                                                    {guide?.content?.map(
                                                                        (
                                                                            content,
                                                                            index
                                                                        ) => (
                                                                            <Grid
                                                                                item
                                                                                xs={
                                                                                    12
                                                                                }
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                <div
                                                                                    className={cx(
                                                                                        "policy-content-item"
                                                                                    )}
                                                                                >
                                                                                    <PanToolAltRounded
                                                                                        style={{
                                                                                            transform:
                                                                                                "rotate(90deg)",
                                                                                            color: "var(--primary-500)",
                                                                                        }}
                                                                                    />
                                                                                    <span>
                                                                                        {
                                                                                            content
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            </Grid>
                                                                        )
                                                                    )}
                                                                </Grid>
                                                            </div>
                                                        </Grid>
                                                    ))}
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                </Grid> */}

                <StepperBooking />
            </div>
        </main>
    );
}

export default OverviewBooking;
