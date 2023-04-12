import React, { useEffect } from "react";
import styles from "./Service.module.scss";
import { Grid } from "@material-ui/core";
import classNames from "classnames/bind";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

function Service() {
    useEffect(() => {
        // Thiết lập tiêu đề của trang
        document.title = "Dịch vụ làm tóc";
    }, []);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <div className="col-8-left">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <header className={cx("header-title")}>
                                        <h1>
                                            CÁC DỊCH VỤ CHĂM SÓC TÓC TẠI Gentle
                                            Beauty
                                        </h1>
                                    </header>
                                </Grid>
                                <Grid item xs={12}>
                                    <blockquote className={cx("blockquote")}>
                                        <p>
                                            Trong thời gian gần đây, các bạn trẻ
                                            và cả những cô chú trung niên ngày
                                            càng quan tâm nhiều hơn đến vấn đề
                                            chăm sóc mái tóc. Nguyên nhân là vì
                                            chất lượng cuộc sống được nâng cao
                                            dẫn đến nhu cầu làm đẹp và chăm sóc
                                            bản thân ngày càng tăng. Để đáp ứng
                                            tốt nhất nhu cầu của khách hàng,
                                            Zema Việt Nam đã phát triển những
                                            dịch vụ chăm sóc tóc chuyên nghiệp
                                            và toàn diện.
                                        </p>
                                    </blockquote>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className={cx("header-img-wrapper")}>
                                        <div className={cx("header-img")}>
                                            <img
                                                src={images.hair_design_service}
                                                alt=""
                                            />
                                        </div>
                                        <span className={cx("caption-img")}>
                                            Chăm sóc tóc với Gentle
                                        </span>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <div className={cx("article-category")}>
                                        Chuyên mục bài viết
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={cx("article")}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <span
                                                className={cx("article-title")}
                                            >
                                                <h2>
                                                    Vì sao cần phải chăm sóc tóc
                                                    thường xuyên?
                                                </h2>
                                            </span>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <article
                                                className={cx(
                                                    "article-content"
                                                )}
                                            >
                                                Cuộc sống ngày càng bận rộn và
                                                môi trường ngày càng ô nhiễm là
                                                nguyên nhân khiến mái tóc bạn dễ
                                                bị tổn thương. Căng thẳng thường
                                                xuyên có thể khiến cơ thể bị rối
                                                loạn nội tiết khiến tóc ngày
                                                càng mỏng và xơ rối. Ngoài ra,
                                                bụi và vi khuẩn bám lên tóc cũng
                                                khiến cho tóc dễ bị gãy rụng. Do
                                                đó, bạn cần phải chú ý đến những
                                                bước chăm sóc tóc cơ bản như:
                                                gội đầu, dưỡng ẩm và che chắn
                                                mái tóc khi ở ngoài trời.
                                                <br />
                                                Chăm sóc tóc thậm chí cũng không
                                                bị giới hạn trong những biện
                                                pháp bảo vệ tóc, mà còn có thể
                                                mở rộng ra việc làm đẹp cho tóc.
                                                Đừng quên cắt tỉa tóc thường
                                                xuyên, hấp dầu định kỳ và chăm
                                                sóc tóc nhuộm đúng cách. Có như
                                                vậy, mái tóc không chỉ khỏe mà
                                                còn đẹp, giúp ngũ quan của bạn
                                                trở nên hài hòa và ngoại hình
                                                cũng cuốn hút hơn.
                                            </article>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className={cx("col-4-right")}>a</div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default Service;
