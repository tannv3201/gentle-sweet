/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import styles from "./ServiceCategoryDetail.module.scss";
import { Grid } from "@mui/material";
import classNames from "classnames/bind";
import images from "../../../assets/images";

import ArticleCategory from "../ArticleCategory/ArticleCategory";
import Comments from "../../../components/Comments/Comments";
import GRrating from "../../../components/GRating/GRating";
import Related from "./Related/Related";
import { getServiceCategoryById } from "../../../redux/api/apiServiceCategory";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { serviceSearch } from "../../../redux/api/apiService";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import { API_IMAGE_URL } from "../../../LocalConstants";
import ServiceItem from "../ServiceItem/ServiceItem";
import { hairService, nailService, hairTip, nailTip } from "./FakeData";

const cx = classNames.bind(styles);

function ServiceCategoryDetail() {
    const { serviceCategoryId } = useParams();
    const user = useSelector((state) => state.auth.login.currentUser);
    const serviceCategory = useSelector(
        (state) => state.serviceCategory.serviceCategory.serviceCategory
    );
    const serviceList = useSelector(
        (state) => state.service.service.serviceListSearch
    );
    const dispatch = useDispatch();
    const [serviceCategoryClone, setServiceCategoryClone] = useState({});
    const [serviceListClone, setServiceListClone] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            await getServiceCategoryById(
                serviceCategoryId,
                null,
                dispatch,
                null
            );
            await serviceSearch(
                null,
                { service_category_id: serviceCategoryId },
                dispatch,
                null
            );
        };

        fetch();
    }, [serviceCategoryId]);

    useEffect(() => {
        if (serviceCategory)
            setServiceCategoryClone(structuredClone(serviceCategory));
        document.title = serviceCategory?.name;
    }, [serviceCategory]);

    useEffect(() => {
        if (serviceList) setServiceListClone(structuredClone(serviceList));
    }, [serviceList]);
    const navigate = useNavigate();
    const handleNavigateServiceDetail = (serviceId) => {
        navigate(`/danh-muc-dich-vu/dich-vu/${serviceId}`);
    };
    console.log(serviceListClone);
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
                                                            {
                                                                serviceCategoryClone?.name
                                                            }
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
                                                            {parseInt(
                                                                serviceCategoryId
                                                            ) === 4
                                                                ? hairService?.overAll
                                                                : nailService?.overAll}
                                                        </p>
                                                    </blockquote>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div>
                                                        <Grid
                                                            container
                                                            spacing={2}
                                                        >
                                                            <Grid item xs={12}>
                                                                <div>
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            2
                                                                        }
                                                                    >
                                                                        {serviceListClone?.map(
                                                                            (
                                                                                service
                                                                            ) => (
                                                                                <Grid
                                                                                    item
                                                                                    lg={
                                                                                        3
                                                                                    }
                                                                                    md={
                                                                                        3
                                                                                    }
                                                                                    sm={
                                                                                        6
                                                                                    }
                                                                                    xs={
                                                                                        6
                                                                                    }
                                                                                    key={
                                                                                        service?.id
                                                                                    }
                                                                                    onClick={() =>
                                                                                        handleNavigateServiceDetail(
                                                                                            service?.id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <ServiceItem
                                                                                        imgUrl={
                                                                                            service?.image_url
                                                                                                ? `${API_IMAGE_URL}/${service?.image_url}`
                                                                                                : ""
                                                                                        }
                                                                                        name={
                                                                                            service?.name
                                                                                        }
                                                                                    />
                                                                                </Grid>
                                                                            )
                                                                        )}
                                                                    </Grid>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <div>
                                                                    <Grid
                                                                        container
                                                                        spacing={
                                                                            2
                                                                        }
                                                                    ></Grid>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <ArticleCategory />
                                                </Grid>
                                                {parseInt(serviceCategoryId) ===
                                                    4 && (
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
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                >
                                                                    <span
                                                                        className={cx(
                                                                            "service-reason-title"
                                                                        )}
                                                                    >
                                                                        <h2 id="heading-title-1">
                                                                            {
                                                                                hairService?.reasonTitle
                                                                            }
                                                                        </h2>
                                                                    </span>
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                >
                                                                    <div
                                                                        className={cx(
                                                                            "service-reason-content"
                                                                        )}
                                                                    >
                                                                        <p>
                                                                            {
                                                                                hairService?.reasonContent
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </div>
                                                    </Grid>
                                                )}
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
                                                            {parseInt(
                                                                serviceCategoryId
                                                            ) === 4
                                                                ? hairService?.title
                                                                : nailService?.title}
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
                                                            {parseInt(
                                                                serviceCategoryId
                                                            ) === 4
                                                                ? hairService?.description
                                                                : nailService?.description}
                                                        </p>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    {parseInt(
                                                        serviceCategoryId
                                                    ) === 4
                                                        ? hairService?.serviceList?.map(
                                                              (
                                                                  service,
                                                                  index
                                                              ) => (
                                                                  <div
                                                                      key={
                                                                          index
                                                                      }
                                                                      className={cx(
                                                                          "service-item-wrapper"
                                                                      )}
                                                                  >
                                                                      <Grid
                                                                          container
                                                                          spacing={
                                                                              2
                                                                          }
                                                                      >
                                                                          <Grid
                                                                              item
                                                                              xs={
                                                                                  12
                                                                              }
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
                                                                              xs={
                                                                                  12
                                                                              }
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
                                                                              xs={
                                                                                  12
                                                                              }
                                                                          >
                                                                              <div
                                                                                  className={cx(
                                                                                      "service-img"
                                                                                  )}
                                                                              >
                                                                                  <img
                                                                                      src={
                                                                                          service?.image
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
                                                                              xs={
                                                                                  12
                                                                              }
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
                                                          )
                                                        : nailService?.serviceList?.map(
                                                              (
                                                                  service,
                                                                  index
                                                              ) => (
                                                                  <div
                                                                      key={
                                                                          index
                                                                      }
                                                                      className={cx(
                                                                          "service-item-wrapper"
                                                                      )}
                                                                  >
                                                                      <Grid
                                                                          container
                                                                          spacing={
                                                                              2
                                                                          }
                                                                      >
                                                                          <Grid
                                                                              item
                                                                              xs={
                                                                                  12
                                                                              }
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
                                                                              xs={
                                                                                  12
                                                                              }
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
                                                                              xs={
                                                                                  12
                                                                              }
                                                                          >
                                                                              <div
                                                                                  className={cx(
                                                                                      "service-img"
                                                                                  )}
                                                                              >
                                                                                  <img
                                                                                      src={
                                                                                          service?.image
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
                                                                              xs={
                                                                                  12
                                                                              }
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
                                    {parseInt(serviceCategoryId) === 4 && (
                                        <Grid item xs={12}>
                                            <div
                                                className={cx(
                                                    "tips-list-wrapper"
                                                )}
                                            >
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <span
                                                            className={cx(
                                                                "tips-list-title"
                                                            )}
                                                        >
                                                            <h2 id="heading-title-3">
                                                                {hairTip?.title}
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
                                                                {
                                                                    hairTip?.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div
                                                            className={cx(
                                                                "tips-item-wrapper"
                                                            )}
                                                        >
                                                            {hairTip?.tipsList?.map(
                                                                (
                                                                    tips,
                                                                    index
                                                                ) => (
                                                                    <Grid
                                                                        key={
                                                                            index
                                                                        }
                                                                        container
                                                                        spacing={
                                                                            1
                                                                        }
                                                                    >
                                                                        <Grid
                                                                            item
                                                                            xs={
                                                                                12
                                                                            }
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
                                                                            xs={
                                                                                12
                                                                            }
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
                                    )}

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

export default ServiceCategoryDetail;
