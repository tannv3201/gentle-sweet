import React from "react";
import classNames from "classnames/bind";
import styles from "./AboutUsPosts.module.scss";
import { Grid } from "@material-ui/core";
import images from "../../../assets/images";

const cx = classNames.bind(styles);

function AboutUsPosts() {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <Grid container spacing={3}>
                    <Grid item xs={12} container className={cx("posts-single")}>
                        <Grid item xs={12} className={cx("posts-title")}>
                            <h1>
                                Gentle với ước mơ trở thành thương hiệu làm đẹp
                                uy tín hàng đầu Việt Nam
                            </h1>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("posts-content")}>
                                <p>
                                    <span className={cx("highlight")}>
                                        Gentle
                                    </span>{" "}
                                    là một địa chỉ làm đẹp chất lượng cao tại
                                    Việt Nam. Với đội ngũ chuyên viên giàu kinh
                                    nghiệm và sự tận tâm với khách hàng, chúng
                                    tôi cam kết mang đến cho bạn trải nghiệm làm
                                    đẹp hoàn hảo. Chúng tôi đang cố gắng vươn
                                    lên để dần trở thành một trong những thương
                                    hiệu làm đẹp uy tín hàng đầu Việt Nam. Với
                                    sự quan tâm và tín nhiệm của khách hàng,
                                    chúng tôi sẽ không ngừng nỗ lực và phát
                                    triển để đem đến cho bạn những trải nghiệm
                                    làm đẹp đáng nhớ nhất. Hãy đến với Spa
                                    Gentle và cùng chúng tôi thư giãn và làm
                                    đẹp!
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={cx("posts-img-wrapper")}>
                            <div className={cx("posts-img")}>
                                <img src={images.warehouse} alt="" />
                                <span>Hình ảnh tại kho vật tư</span>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container className={cx("posts-single")}>
                        <Grid item xs={12} className={cx("posts-title")}>
                            <h1>
                                Hệ thống chi nhánh của Spa Gentle - Chăm sóc sắc
                                đẹp đẳng cấp trong tầm tay
                            </h1>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("posts-content")}>
                                <p>
                                    <span className={cx("highlight")}>
                                        Gentle
                                    </span>{" "}
                                    đã và đang trở thành một trong những thương
                                    hiệu chăm sóc sắc đẹp uy tín hàng đầu tại
                                    Việt Nam, với hệ thống chi nhánh bao gồm{" "}
                                    <span className={cx("highlight")}>
                                        5 cơ sở
                                    </span>{" "}
                                    tại{" "}
                                    <span className={cx("highlight")}>
                                        3 tỉnh/thành phố
                                    </span>
                                    . Với sứ mệnh cung cấp dịch vụ chăm sóc sắc
                                    đẹp đẳng cấp, từng chi nhánh của Gentle đều
                                    được trang bị với những thiết bị và công
                                    nghệ hiện đại nhất. Đặc biệt, đội ngũ nhân
                                    sự của Gentle được đào tạo chuyên nghiệp,
                                    tận tâm và giàu kinh nghiệm, luôn sẵn sàng
                                    để mang đến cho khách hàng những trải nghiệm
                                    chăm sóc tuyệt vời nhất. Với hơn{" "}
                                    <span className={cx("highlight")}>
                                        30 nhân sự
                                    </span>{" "}
                                    tận tâm và đam mê, Gentle sẵn sàng đồng hành
                                    cùng bạn trên con đường chăm sóc và nâng tầm
                                    vẻ đẹp của bản thân.
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={cx("posts-img-wrapper")}>
                            <div className={cx("posts-img")}>
                                <img src={images.photo_realistic} alt="" />
                                <span>Hình ảnh tại cơ sở Thái Bình</span>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container className={cx("posts-single")}>
                        <Grid item xs={12} className={cx("posts-title")}>
                            <h1>
                                Nâng tầm vẻ đẹp người phụ nữ Việt Nam cùng
                                Gentle
                            </h1>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("posts-content")}>
                                <p>
                                    <span className={cx("highlight")}>
                                        Gentle
                                    </span>{" "}
                                    luôn khao khát được đồng hành cùng những{" "}
                                    <span className={cx("highlight")}>
                                        người phụ nữ Việt Nam
                                    </span>{" "}
                                    trong việc nâng tầm vẻ đẹp và tự tin của
                                    chính họ. Với mục tiêu đem đến cho khách
                                    hàng những trải nghiệm làm đẹp tốt nhất,
                                    Gentle không ngừng nghiên cứu, đầu tư và
                                    phát triển hệ thống dịch vụ và sản phẩm chất
                                    lượng cao, đồng thời tạo ra môi trường làm
                                    việc chuyên nghiệp và thân thiện cho nhân
                                    viên. Với niềm đam mê và tâm huyết, Gentle
                                    đã không ngừng phát triển và mở rộng hệ
                                    thống chi nhánh tại các thành phố lớn, để
                                    đưa đến cho khách hàng trên toàn quốc những
                                    trải nghiệm chăm sóc sắc đẹp đẳng cấp.
                                    Gentle tin rằng vẻ đẹp của một người phụ nữ
                                    không chỉ đơn thuần là ngoại hình, mà còn là
                                    sự tự tin, mạnh mẽ và quyến rũ. Và Gentle
                                    sẵn sàng đồng hành cùng các chị em phụ nữ
                                    Việt Nam để nâng tầm vẻ đẹp và tự tin của
                                    mình.
                                </p>
                            </div>
                        </Grid>
                        <Grid item xs={12} className={cx("posts-img-wrapper")}>
                            <div className={cx("posts-img")}>
                                <img src={images.phu_nu_viet_nam} alt="" />
                                <span>Hình ảnh người phụ nữ Việt Nam</span>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container className={cx("posts-single")}>
                        <Grid item xs={12} className={cx("posts-title")}>
                            <h1>
                                Quý khách hàng là nguồn động lực cho Spa Gentle
                                phát triển
                            </h1>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={cx("posts-content")}>
                                <p>
                                    <span className={cx("highlight")}>
                                        Gentle
                                    </span>{" "}
                                    xin gửi lời cảm ơn chân thành tới những
                                    khách hàng đã tin tưởng và sử dụng dịch vụ
                                    của chúng tôi. Chúng tôi rất trân trọng sự
                                    ủng hộ và đóng góp của quý khách hàng, đó là
                                    động lực để chúng tôi không ngừng cải tiến
                                    chất lượng dịch vụ và mang đến cho khách
                                    hàng những trải nghiệm tuyệt vời nhất tại
                                    Spa Gentle.
                                </p>
                            </div>
                        </Grid>
                        {/* <Grid item xs={12} className={cx("posts-img-wrapper")}>
                            <div className={cx("posts-img")}>
                                <img src={images.phu_nu_viet_nam} alt="" />
                                <span>Hình ảnh người phụ nữ Việt Nam</span>
                            </div>
                        </Grid> */}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default AboutUsPosts;
