/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import styles from "./Service.module.scss";
import { Grid } from "@mui/material";
import classNames from "classnames/bind";
import images from "../../../assets/images";

import ArticleCategory from "../ArticleCategory/ArticleCategory";
import Comments from "../../../components/Comments/Comments";
import GRrating from "../../../components/GRating/GRating";
import Related from "./Related/Related";

const cx = classNames.bind(styles);

const services = {
    title: "Gentle Beauty đang cung cấp những dịch vụ chăm sóc tóc nào?",
    description:
        "Hiểu được nhu cầu làm đẹp của khách hàng, Gentle Beauty đã và đang phát triển những dịch vụ chăm sóc tóc chuyên nghiệp và toàn diện nhất. Những dịch vụ thu hút nhiều sự quan tâm của khách hàng nhất phải kể đến là:",
    serviceList: [
        {
            id: 1,
            title: "Cắt tóc",
            partArticle1:
                "Một mái tóc được cắt tỉa cẩn thận cũng đủ khiến bạn trở nên thu hút hơn nhiều. Tại Gentle Beauty, mái tóc của bạn sẽ được tạo kiểu bởi những chuyên viên với nhiều năm kinh nghiệm. Dù sở hữu kiểu mặt nào, mặt tròn, mặt góc cạnh hay mặt dài, bạn cũng sẽ được tư vấn để chọn kiểu tóc phù hợp với bản thân nhất.",
            partArticle2:
                "Đây là dịch vụ chăm sóc tóc phù hợp với những bạn muốn thay đổi phong cách hoặc chỉ đơn giản là muốn tỉa lại mái tóc cho gọn gàng. Dù mục tiêu của bạn là gì, chắc chắn sau khi soi gương bạn cũng sẽ hài lòng về kiểu tóc của mình.",
            image: images.service_2,
        },
        {
            id: 2,
            title: "Uốn tóc",
            partArticle1:
                "Tóc uốn luôn dẫn đầu xu hướng thời trang trong nhiều năm qua. Nếu muốn trải nghiệm việc uốn tóc hoặc muốn đổi kiểu tóc uốn khác, hãy đến với Gentle Beauty Việt Nam. Những chuyên gia tại Gentle Beauty luôn cập nhật xu hướng mới nhất sẽ tư vấn giúp bạn chọn được kiểu tóc uốn độc đáo và phù hợp nhất với cá tính của mình.",
            partArticle2:
                "Với dụng cụ uốn tóc và sản phẩm chăm sóc tóc chuyên biệt, chuyên viên sẽ “hô biến” mái tóc thẳng thành tóc xoăn độc đáo. Có rất nhiều sự lựa chọn khi uốn tóc như: uốn phồng chân tóc,  uốn ngang vai, uốn xoăn dài, uốn xếp tầng… bạn sẽ tìm được kiểu tóc phù hợp nhất với cá tính của mình.",
            image: images.service_2,
        },
        {
            id: 3,
            title: "Nhuộm tóc",
            partArticle1:
                "Dù là nam hay nữ, cách đơn giản nhất để thay đổi bản thân đó là nhuộm tóc. Hãy đến Gentle Beauty và trải nghiệm dịch vụ nhuộm tóc chuyên nghiệp với những kiểu tóc nhuộm độc đáo như: tóc màu hồng phấn, tóc màu xanh ombre, tóc màu bạch kim, tóc màu vàng kim…. Dù muốn nhuộm lại tóc, che đi khuyết điểm trên tóc hoặc tạo điểm nhấn cho khuôn mặt, bạn chắc chắn sẽ hài lòng với kết quả nhận được.",
            partArticle2: "",
            image: images.service_2,
        },
        {
            id: 4,
            title: "Duỗi tóc",
            partArticle1:
                "Đây là dịch vụ chăm sóc tóc dành cho những bạn mong muốn sở hữu một mái tóc óng ả, thẳng mượt và vào nếp. Những kỹ thuật viên dày dặn kinh nghiệm tại Gentle Beauty sẽ tư vấn và chăm sóc đúng cách giúp mang lại một mái tóc suôn mượt như mong đợi bằng những sản phẩm chăm sóc tóc cao cấp.",
            partArticle2: "",
            image: images.service_2,
        },
        {
            id: 5,
            title: "Phục hồi tóc",
            partArticle1: "",
            partArticle2:
                "Gentle Beauty áp dụng những kỹ thuật hiện đại nhất để khôi phục lại kết cấu và hồi phục sợi tóc bị hư tổn. Bằng cách sử dụng những thiết bị chuyên dụng như máy sấy, máy nano… dưỡng chất từ những sản phẩm phục hồi tóc cao cấp sẽ thẩm thấu sâu giúp phục hồi tóc từ bên trong. Nhờ vậy, bạn sẽ có thể sở hữu một mái tóc chắc khỏe, suôn mượt và đầy sức sống. Gentle Beauty sẽ giúp bạn có được một mái tóc khỏe mạnh và suôn mượt",
            image: images.service_2,
        },
        {
            id: 6,
            title: "Trị rụng tóc",
            partArticle1:
                "Đây là một trong những dịch vụ chăm sóc tóc được yêu thích nhất tại Gentle Beauty. Gentle Beauty áp dụng công nghệ trị rụng tóc chuyên sâu giúp giải quyết vấn đề rụng tóc của khách hàng nhanh chóng và hiệu quả nhất. Bằng cách kết hợp dầu gội đặc trị, phương pháp massage và huyết thanh kích thích mọc tóc, mái tóc của bạn sẽ trở nên dày khỏe, bồng bềnh và tươi tắn trở lại. Hiệu quả này có thể nhận thấy ngay lập tức sau chỉ 1 liệu trình điều trị.",
            partArticle2: "",
            image: images.service_2,
        },
        {
            id: 7,
            title: "Gội đầu massage",
            partArticle1:
                "Bằng cách áp dụng phương pháp massage từ Ấn Độ, chuyên viên tại Gentle Beauty sẽ mang đến cho bạn những phút giây thư giãn hiếm hoi giữa cuộc sống bận rộn. Không những thế, động tác massage da đầu còn giúp tăng cường lưu thông máu đến da dầu kích thích nang tóc phát triển. Chỉ một dịch vụ nhưng mang lại lợi ích kép.",
            partArticle2:
                "Nếu muốn trải nghiệm những dịch vụ chăm sóc tóc tốt nhất, hãy đến với Gentle Beauty. Bạn sẽ cảm nhận được hiệu quả tức thì và cảm giác được chăm sóc tận tình, chu đáo nhất.",
            image: images.service_2,
        },
    ],
};

const tips = {
    title: "15 tips chăm sóc tóc cho tóc bạn luôn khỏe",
    description:
        "Cuối năm, thời tiết vào mùa đông hanh khô, mất nước cộng thêm khí lạnh khiến tóc dễ gãy rụng, rối khô… Bỏ túi ngay 15 tips chăm sóc tóc đúng cách mà vô cùng dễ làm dưới đây nào! Chỉ cần thực hiện được ít nhất 4 tips dưới đây là nàng đã có mái tóc mềm mượt, óng ả rồi đấy! Cùng Gentle Beauty tìm hiểu ngay nào :",
    tipsList: [
        {
            title: "Gội đầu cũng phải đúng cách",
            description:
                "Nàng có biết mỗi lần gội đầu, bụi bẩn được làm sạch nhưng chất dầu của tóc cũng bị hao hụt. Nếu gội đầu quá nhiều, tóc mất đi chất dầu tự nhiên dễ trở nên xơ cứng, khô, dễ rối, dễ gãy. Vì vậy chỉ nên gội đầu 1- 2 lần vào mùa lạnh. Nếu da đầu nhiều dầu, nàng có thể tham khảo sử dụng dầu gội khô.",
        },
        {
            title: "Chăm sóc tóc thì không gội đầu nước quá nóng",
            description:
                "Mùa đông thì tắm nước nóng mới thích, nhưng đừng để tóc gặp nước quá nóng, khiến ảnh hưởng chân tóc và da đầu. Và khi tắm nước nóng, xông hơi thì đừng quên quấn tóc, trùm khăn nhé!",
        },
        {
            title: "Thường xuyên bổ sung độ ẩm để chăm sóc cho tóc",
            description:
                "Nguyên tắc quan trọng của việc chăm sóc tóc chính là tăng cường độ ẩm, tránh cho tóc khô xơ, dễ gãy. Thường xuyên xịt dưỡng hoặc đi hấp tóc, phục hồi tóc là những gợi ý dành cho bạn. Tóc đủ độ ẩm không chỉ giúp tóc mềm mượt hơn mà còn nhanh dài và giữ màu lâu hơn.",
        },
        {
            title: "Đừng coi thường dầu xả – Bước quan trọng trong chăm sóc tóc đấy",
            description:
                "Bỏ qua dầu xả là một sai lầm, bỏ qua dầu sả khi thời tiết hanh khô lạnh lẽo lại càng sai lầm khi chăm sóc tóc. Bởi dầu sả cung cấp dưỡng chất và độ ẩm, giúp tóc mềm mượt, ít khô rối hơn.",
        },
        {
            title: "Hạn chế dùng máy sấy, uốn, duỗi",
            description:
                "Những dụng cụ nhiệt giúp bạn tiết kiệm thời gian sấy tóc hoặc làm đẹp, tạo kiểu nhưng cũng lấy đi độ ẩm của tóc rất nhanh. Hơn thể nữa, nhiệt nóng khiến tóc bị tổn thương nặng, đặc biệt vào mùa lạnh. Vì vậy hãy hạn chế sử dụng máy sấy mà để tóc khô tự nhiên. Còn nếu dùng máy uốn, duỗi tạo kiểu thì đừng quên xịt dưỡng để chăm sóc tóc nhé!.",
        },
        {
            title: "Ra ngoài nên đội mũ",
            description:
                "Những cơn gió, ánh nắng, khói bụi, hạt mưa bất chợt… đều là kẻ thù của mái tóc. Vậy nên hãy đội mũ khi ra ngoài, mũ len mềm nhẹ là tốt nhất bạn nhé!",
        },
        {
            title: "Sử dụng máy tạo độ ẩm",
            description:
                "Mùa đông lạnh nên trong các gia đình thường có lò sưởi, máy tỏa nhiệt… Những chiếc máy này có thể là nguyên nhân tóc khô xơ, dễ gãy vì tổn thương. Vì vậy nên chuẩn bị máy tạo độ ẩm trong nhà. Sử dụng loại máy mini trên bàn làm việc cũng là gợi ý không tồi.",
        },
        {
            title: "Cắt tỉa tóc thường xuyên hơn",
            description:
                "Cứ mỗi 2–3 tháng đối với tóc dài và 4–8 tuần với tóc ngắn nên cắt tỉa tóc để hạn chế tóc chẻ ngọn. Giúp tóc tập trung nuôi tóc khỏe mạnh cũng là một tips để chăm sóc tóc nhé! Lưu ý khi cắt tóc nên dùng dụng cụ cắt chuyên dụng và được vệ sinh kỹ, tránh gây tổn thương cho tóc.",
        },
        {
            title: "Sử dụng thực phẩm tốt cho mái tóc",
            description:
                "Axit béo omega-3 được chứng minh giúp duy trì mái tóc mượt mà, óng ả và phát triển tốt. Do đó hãy ăn nhiều thực phẩm tươi, giàu Axit béo omega-3 được giúp tóc được chắc khỏe hơn.",
        },
        {
            title: "Luôn bổ sung vitamin C cho tóc",
            description:
                "Vitamin C không chỉ giúp tăng sức đề kháng mà còn chống oxy hóa tự nhiên, ngăn chặn thương tổn cho tóc từ tác nhân bên ngoài, từ đó giúp tóc mềm mượt, óng ả hơn. Bên có thể ăn cam, quýt hoặc uống nước ép... để chăm sóc tóc từ bên trong.",
        },
        {
            title: "Dưỡng ẩm từ trong cơ thể",
            description:
                "Độ ẩm rất quan trọng nên chỉ bổ sung bên ngoài chỉ giải quyết được nhất thời. Muốn tóc khỏe từ bên trong cần uống nước nhiều, thường xuyên sử dụng thực phẩm tươi mát, giàu nước, khoáng chất.",
        },
        {
            title: "Massage da đầu",
            description:
                "Massage da đầu bằng dầu dừa, tinh dầu Bơ, Gấc… không chỉ giúp da đầu, tóc thư giãn mà còn giúp tinh thần sảng khoái hơn, từ đó tóc được chăm sóc cho tóc tốt hơn.",
        },
        {
            title: "Đừng mang tóc ướt ra ngoài",
            description:
                "Gội đầu xong nên sấy tóc ở chế độ mát trước khi ra khỏi nhà tắm sẽ giúp tóc không bị “sốc nhiệt”. Đó là lý do các nhà tắm luôn có máy sấy. Và đương nhiên, tóc ướt thì càng không nên ra ngoài vì tác nhân môi trường, khí lạnh… có thể làm tóc tổn thương. Không nên mang tóc ướt ra ngoài",
        },
        {
            title: "Dùng tinh dầu để chăm sóc tóc",
            description:
                "Tinh dầu giúp dưỡng ẩm, cung cấp dưỡng chất nuôi tóc cực kỳ nhanh chóng. Vì vậy, hãy tập thói quen sử dụng tinh dầu cho tóc luôn chắc khỏe các nàng nhé.",
        },
        {
            title: "Hấp dầu định kỳ cho tóc",
            description:
                "1 – 2 lần trong 1 tuần nếu có điều kiện và thời gian sẽ là cách chăm sóc tóc hiệu quả nhất. Bạn có thể tự hấp dầu ở nhà với sản phẩm rõ nguồn gốc hoặc tự pha chế từ nguyên liệu thiên nhiên. Ở trên là 15 tips chăm sóc tóc dễ làm lại vô cùng hiệu quả mà Gentle Beauty đã tổng hợp. Chỉ cần thực hiện thường xuyên là bạn sẽ có tóc đẹp đón xuân rồi! Chúc các nàng luôn xinh đẹp rạng ngời nhé!",
        },
    ],
};

function Service() {
    // const [hairServiceList, setHairServiceList] = useState([]);

    // const hairServicesFn = () => {
    //     const findService = MenuList.find((menu) => {
    //         return menu.title === "Dịch vụ";
    //     });
    //     const hairSv = findService?.children?.find((child) => {
    //         return child?.title === "Dịch vụ tóc";
    //     });

    //     return hairSv?.children;
    // };

    useEffect(() => {
        // Thiết lập tiêu đề của trang
        document.title = "Dịch vụ làm tóc";
        // const hairServiceFnRun = hairServicesFn();
        // setHairServiceList(hairServiceFnRun);
    }, []);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("wrapper-service")}>
                <div className={cx("inner")}>
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item lg={9} md={12} sm={12}>
                            <div className={cx("col-9-left")}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <div
                                            className={cx(
                                                "introduce-service-wrapper"
                                            )}
                                        >
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <span
                                                        className={cx(
                                                            "introduce-service-title"
                                                        )}
                                                    >
                                                        <h1>
                                                            Các dịch vụ chăm sóc
                                                            tóc tại Gentle
                                                        </h1>
                                                    </span>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <blockquote
                                                        className={cx(
                                                            "introduce-service-blockquote"
                                                        )}
                                                    >
                                                        <p>
                                                            Trong thời gian gần
                                                            đây, các bạn trẻ và
                                                            cả những cô chú
                                                            trung niên ngày càng
                                                            quan tâm nhiều hơn
                                                            đến vấn đề chăm sóc
                                                            mái tóc. Nguyên nhân
                                                            là vì chất lượng
                                                            cuộc sống được nâng
                                                            cao dẫn đến nhu cầu
                                                            làm đẹp và chăm sóc
                                                            bản thân ngày càng
                                                            tăng. Để đáp ứng tốt
                                                            nhất nhu cầu của
                                                            khách hàng, Gentle
                                                            Beauty Việt Nam đã
                                                            phát triển những
                                                            dịch vụ chăm sóc tóc
                                                            chuyên nghiệp và
                                                            toàn diện.
                                                        </p>
                                                    </blockquote>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div
                                                        className={cx(
                                                            "service-img"
                                                        )}
                                                    >
                                                        <img
                                                            src={
                                                                images.service_1
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <span
                                                        className={cx(
                                                            "caption-img"
                                                        )}
                                                    >
                                                        Chăm sóc tóc với Gentle
                                                    </span>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <ArticleCategory />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div
                                                        className={cx(
                                                            "service-reason"
                                                        )}
                                                    >
                                                        <Grid
                                                            container
                                                            spacing={1}
                                                        >
                                                            <Grid item xs={12}>
                                                                <span
                                                                    className={cx(
                                                                        "service-reason-title"
                                                                    )}
                                                                >
                                                                    <h2 id="heading-title-1">
                                                                        Vì sao
                                                                        cần phải
                                                                        chăm sóc
                                                                        tóc
                                                                        thường
                                                                        xuyên?
                                                                    </h2>
                                                                </span>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <div
                                                                    className={cx(
                                                                        "service-reason-content"
                                                                    )}
                                                                >
                                                                    <p>
                                                                        Cuộc
                                                                        sống
                                                                        ngày
                                                                        càng bận
                                                                        rộn và
                                                                        môi
                                                                        trường
                                                                        ngày
                                                                        càng ô
                                                                        nhiễm là
                                                                        nguyên
                                                                        nhân
                                                                        khiến
                                                                        mái tóc
                                                                        bạn dễ
                                                                        bị tổn
                                                                        thương.
                                                                        Căng
                                                                        thẳng
                                                                        thường
                                                                        xuyên có
                                                                        thể
                                                                        khiến cơ
                                                                        thể bị
                                                                        rối loạn
                                                                        nội tiết
                                                                        khiến
                                                                        tóc ngày
                                                                        càng
                                                                        mỏng và
                                                                        xơ rối.
                                                                        Ngoài
                                                                        ra, bụi
                                                                        và vi
                                                                        khuẩn
                                                                        bám lên
                                                                        tóc cũng
                                                                        khiến
                                                                        cho tóc
                                                                        dễ bị
                                                                        gãy
                                                                        rụng. Do
                                                                        đó, bạn
                                                                        cần phải
                                                                        chú ý
                                                                        đến
                                                                        những
                                                                        bước
                                                                        chăm sóc
                                                                        tóc cơ
                                                                        bản như:
                                                                        gội đầu,
                                                                        dưỡng ẩm
                                                                        và che
                                                                        chắn mái
                                                                        tóc khi
                                                                        ở ngoài
                                                                        trời.
                                                                        Chăm sóc
                                                                        tóc thậm
                                                                        chí cũng
                                                                        không bị
                                                                        giới hạn
                                                                        trong
                                                                        những
                                                                        biện
                                                                        pháp bảo
                                                                        vệ tóc,
                                                                        mà còn
                                                                        có thể
                                                                        mở rộng
                                                                        ra việc
                                                                        làm đẹp
                                                                        cho tóc.
                                                                        Đừng
                                                                        quên cắt
                                                                        tỉa tóc
                                                                        thường
                                                                        xuyên,
                                                                        hấp dầu
                                                                        định kỳ
                                                                        và chăm
                                                                        sóc tóc
                                                                        nhuộm
                                                                        đúng
                                                                        cách. Có
                                                                        như vậy,
                                                                        mái tóc
                                                                        không
                                                                        chỉ khỏe
                                                                        mà còn
                                                                        đẹp,
                                                                        giúp ngũ
                                                                        quan của
                                                                        bạn trở
                                                                        nên hài
                                                                        hòa và
                                                                        ngoại
                                                                        hình
                                                                        cũng
                                                                        cuốn hút
                                                                        hơn.
                                                                    </p>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div
                                            className={cx(
                                                "service-list-wrapper"
                                            )}
                                        >
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <span
                                                        className={cx(
                                                            "service-list-title"
                                                        )}
                                                    >
                                                        <h2 id="heading-title-2">
                                                            {services?.title}
                                                        </h2>
                                                    </span>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div
                                                        className={cx(
                                                            "service-list-description"
                                                        )}
                                                    >
                                                        <p>
                                                            {
                                                                services?.description
                                                            }
                                                        </p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    {services?.serviceList?.map(
                                                        (service, index) => (
                                                            <div
                                                                key={index}
                                                                className={cx(
                                                                    "service-item-wrapper"
                                                                )}
                                                            >
                                                                <Grid
                                                                    container
                                                                    spacing={2}
                                                                >
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
                                                                        <span
                                                                            className={cx(
                                                                                "service-item-title"
                                                                            )}
                                                                        >
                                                                            <h2
                                                                                id={`service-item-${index}`}
                                                                            >
                                                                                {`${
                                                                                    index +
                                                                                    1
                                                                                }. ${
                                                                                    service?.title
                                                                                }`}
                                                                            </h2>
                                                                        </span>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
                                                                        <div
                                                                            className={cx(
                                                                                "service-item-part-article"
                                                                            )}
                                                                        >
                                                                            <p>
                                                                                {
                                                                                    service?.partArticle1
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
                                                                        <div
                                                                            className={cx(
                                                                                "service-img"
                                                                            )}
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    images.service_3
                                                                                }
                                                                                alt=""
                                                                            />
                                                                        </div>
                                                                        <span
                                                                            className={cx(
                                                                                "caption-img"
                                                                            )}
                                                                        >
                                                                            {
                                                                                service.title
                                                                            }
                                                                        </span>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
                                                                        <div
                                                                            className={cx(
                                                                                "service-item-part-article"
                                                                            )}
                                                                        >
                                                                            <p>
                                                                                {
                                                                                    service?.partArticle2
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </div>
                                                        )
                                                    )}
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div
                                            className={cx("tips-list-wrapper")}
                                        >
                                            <Grid container spacing={1}>
                                                <Grid item xs={12}>
                                                    <span
                                                        className={cx(
                                                            "tips-list-title"
                                                        )}
                                                    >
                                                        <h2 id="heading-title-3">
                                                            {tips?.title}
                                                        </h2>
                                                    </span>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div
                                                        className={cx(
                                                            "tips-list-description"
                                                        )}
                                                    >
                                                        <p>
                                                            {tips?.description}
                                                        </p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div
                                                        className={cx(
                                                            "tips-item-wrapper"
                                                        )}
                                                    >
                                                        {tips?.tipsList?.map(
                                                            (tips, index) => (
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
                                                                                "tips-item-title"
                                                                            )}
                                                                        >
                                                                            <h2
                                                                                id={`tips-${index}`}
                                                                            >
                                                                                {`${
                                                                                    index +
                                                                                    1
                                                                                }. ${
                                                                                    tips?.title
                                                                                }`}
                                                                            </h2>
                                                                        </span>
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
                                                                        <div
                                                                            className={cx(
                                                                                "tips-item-description"
                                                                            )}
                                                                        >
                                                                            <p>
                                                                                {
                                                                                    tips?.description
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            )
                                                        )}
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <div className={cx("service-rating")}>
                                            <span
                                                className={cx(
                                                    "service-rating-title"
                                                )}
                                            >
                                                Chọn đánh giá sao
                                            </span>
                                            <GRrating />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div
                                            className={cx("recommend-wrapper")}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <span
                                                        className={cx(
                                                            "recommend-title"
                                                        )}
                                                    >
                                                        <h2 id="heading-title-4">
                                                            Có thể bạn quan tâm
                                                        </h2>
                                                    </span>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <ul
                                                        className={cx(
                                                            "recommend-link-list"
                                                        )}
                                                    >
                                                        <li>
                                                            <a href="#">
                                                                Nối tóc bao
                                                                nhiêu tiền? Thời
                                                                gian giữ được
                                                                bao lâu?
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                Xu hướng tóc đẹp
                                                                hot nhất Hàn
                                                                Quốc 2019
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                35 kiểu tóc tỉa
                                                                layer giúp bạn
                                                                “lột xác” trong
                                                                2022 (UPDATE)
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a href="#">
                                                                20 kiểu tóc xoăn
                                                                lọn to trẻ
                                                                trung, nàng nhất
                                                                định phải thử
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Comments />
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item lg={3} md={12} sm={12}>
                            <div className={cx("col-3-right")}>
                                <Related />
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    );
}

export default Service;
