import React, { useState } from "react";
import styles from "./ArticleCategory.module.scss";
import classNames from "classnames/bind";
import { IconButton } from "@mui/material";
import {
    MenuRounded,
    ClearAllRounded,
    CloseRounded,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { LightTooltip } from "../MyTooltip/MyTooltip";
import { SwipeableDrawer } from "@mui/material";
const cx = classNames.bind(styles);

function ArticleCategory({ h2Nodes }) {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const [isOpenCategory, setIsOpenCategory] = useState(true);
    const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);
    const [isActiveTitle, setIsActiveTitle] = useState("");

    const toggleDrawer = React.useCallback(
        () => setIsOpenDrawer((prevOpen) => !prevOpen),
        [setIsOpenDrawer]
    );
    const h2NodesRef = React.useRef(null);

    React.useEffect(() => {
        const h2Nodes = document.querySelectorAll("h2");

        h2NodesRef.current = h2Nodes;
    }, []);
    const scrollToElement = (id) => {
        const element = document.getElementById(id);
        const scrollOptions = {
            behavior: "smooth",
        };
        const headerHeight = isMedium ? 58 : 116;
        if (element) {
            const elementRect = element.getBoundingClientRect();
            const y = elementRect.top + window.pageYOffset - headerHeight;
            window.scrollTo({ top: y, ...scrollOptions });
        }
    };
    const handleScrollToElement = (id) => {
        // Thiết lập giá trị biến trạng thái activeId
        setIsActiveTitle(id);
        console.log(id);
    };
    // Render các thẻ a tương ứng với các thẻ h2
    const renderLinks = () => {
        if (h2NodesRef.current) {
            let count = 0;
            let padding = 0;

            return Array.from(h2NodesRef.current).map((h2Node, index) => {
                const id = h2Node.id;
                const textContent = h2Node.textContent;

                // Kiểm tra nếu id của thẻ h2 chứa "heading-title"
                // thì gán giá trị đầu tiên cho biến đếm, sau đó tăng giá trị lên 1
                if (id.includes("heading-title")) {
                    padding = 1;
                    count++;
                } else {
                    padding = 4;
                }

                return (
                    <li
                        key={index}
                        id="tip-item-li"
                        style={
                            isOpenCategory && isSmall
                                ? {
                                      padding: ` 4px 8px 4px ${padding * 8}px`,
                                  }
                                : isOpenCategory
                                ? {
                                      padding: ` 2px 8px 2px ${padding * 8}px`,
                                  }
                                : { padding: ` 0 8px 0 ${padding * 8}px` }
                        }
                    >
                        <span
                            onClick={() => {
                                scrollToElement(id);
                                setIsOpenDrawer(false);
                                handleScrollToElement(id);
                            }}
                            key={id}
                            style={
                                id.includes("heading-title")
                                    ? {
                                          fontWeight: "var(--fw-medium)",
                                      }
                                    : isActiveTitle === id
                                    ? { color: "var(--primary)" }
                                    : {}
                            }
                        >
                            {id.includes("heading-title") ? `${count}. ` : ""}
                            {textContent}
                        </span>
                    </li>
                );
            });
        }
        return null;
    };
    return (
        <div className={cx("wrapper")}>
            <div className={cx("inner")}>
                <div className={cx("article-category")}>
                    <div className={cx("article-category-title")}>
                        <span>Chuyên mục bài viết</span>
                        <IconButton
                            onClick={() => setIsOpenCategory(!isOpenCategory)}
                        >
                            {isOpenCategory ? (
                                <ClearAllRounded
                                    fontSize={isMedium ? "large" : "small"}
                                    style={{
                                        transition: "all 0.2s linear",
                                    }}
                                />
                            ) : (
                                <MenuRounded
                                    fontSize={isMedium ? "large" : "small"}
                                    style={{
                                        transition: "all 0.2s linear",
                                    }}
                                />
                            )}
                        </IconButton>
                    </div>
                    <ul
                        id="article-category-link"
                        className={
                            isOpenCategory
                                ? cx("article-category-link", "isOpen")
                                : cx("article-category-link")
                        }
                    >
                        {renderLinks()}
                    </ul>
                </div>
            </div>
            <Box
                sx={{
                    position: "fixed",
                    right: "16px",
                    bottom: "80px",
                }}
            >
                <LightTooltip placement="left" title="Danh mục">
                    <IconButton
                        size="medium"
                        style={{
                            border: "1px solid var(--primary)",
                            backgroundColor: "var(--white)",
                            zIndex: "10",
                        }}
                        onClick={toggleDrawer}
                    >
                        <MenuRounded />
                    </IconButton>
                </LightTooltip>
                <SwipeableDrawer
                    anchor={"right"}
                    open={isOpenDrawer}
                    onClose={toggleDrawer}
                    onOpen={toggleDrawer}
                    className={cx("articles-drawer")}
                >
                    <div className={cx("article-category")}>
                        <div className={cx("article-category-title")}>
                            <IconButton onClick={toggleDrawer}>
                                <CloseRounded
                                    fontSize={isMedium ? "large" : "medium"}
                                />
                            </IconButton>
                            <span>Chuyên mục bài viết</span>
                        </div>
                        <ul
                            id="article-category-link"
                            className={cx("article-category-link")}
                        >
                            {renderLinks()}
                        </ul>
                    </div>
                </SwipeableDrawer>
            </Box>
        </div>
    );
}

export default ArticleCategory;
