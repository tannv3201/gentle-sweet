import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./OverviewBooking.module.scss";
import { Grid, IconButton } from "@mui/material";
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

const cx = classNames.bind(styles);

const listService = [
    {
        categoryTitle: "Dịch vụ tóc",
        childService: [
            {
                title: "Cắt tóc",
            },
            {
                title: "Uốn tóc",
            },
            {
                title: "Nhuộm tóc",
            },
            {
                title: "Duỗi tóc",
            },
            {
                title: "Ép tóc",
            },
            {
                title: "Trị rụng tóc",
            },
            {
                title: "Gội đầu massage",
            },
            {
                title: "Phục hồi tóc",
            },
        ],
    },
    {
        categoryTitle: "Dịch vụ nails",
        childService: [
            {
                title: "Sơn ombre",
            },
            {
                title: "Sơn french",
            },
            {
                title: "Nhúng bột nails",
            },
            {
                title: "Vẽ móng",
            },
            {
                title: "Massage tay chân",
            },
            {
                title: "Chà hồng gót chân",
            },
            {
                title: "Vẽ móng",
            },
            {
                title: "Massage tay chân",
            },
        ],
    },
];

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

function OverviewBooking() {
    const [isOpenPolicy, setIsOpenPolicy] = useState(false);

    const handleOpenPolicy = () => {
        setIsOpenPolicy(!isOpenPolicy);
    };

    return (
        <main className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={1}>
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
                    {/* {listService?.map((services, index) => (
                        <Grid key={index} item xs={6}>
                            <div className={cx("category-service-wrapper")}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <span
                                            className={cx(
                                                "category-service-title"
                                            )}
                                        >
                                            <h3>{services?.categoryTitle}</h3>
                                        </span>
                                    </Grid>
                                    {services?.childService?.map(
                                        (service, index) => (
                                            <Grid key={index} item xs={6}>
                                                <span
                                                    className={cx(
                                                        "service-title"
                                                    )}
                                                >
                                                    {service?.title}
                                                </span>
                                            </Grid>
                                        )
                                    )}
                                </Grid>
                            </div>
                        </Grid>
                    ))} */}
                    <Grid item xs={12}>
                        <div className={cx("policies-guidelines-wrapper")}>
                            <span
                                onClick={handleOpenPolicy}
                                className={
                                    isOpenPolicy
                                        ? cx(
                                              "policies-guidelines-title",
                                              "isOpen"
                                          )
                                        : cx("policies-guidelines-title")
                                }
                            >
                                <h2>Chính sách và hướng dẫn</h2>
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
                                            <span
                                                className={cx("policy-title")}
                                            >
                                                <h3>Chính sách</h3>
                                            </span>
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
                                    <hr
                                        style={{
                                            borderTop:
                                                "1px dashed var(--primary)",
                                            width: "100%",
                                            marginBottom: "12px",
                                            margin: "0 16px 12px 16px",
                                        }}
                                    />
                                    <Grid item xs={12}>
                                        <div className={cx("policy")}>
                                            <span
                                                className={cx("policy-title")}
                                            >
                                                <h3>Hướng dẫn</h3>
                                            </span>
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
                </Grid>
            </div>
        </main>
    );
}

export default OverviewBooking;
