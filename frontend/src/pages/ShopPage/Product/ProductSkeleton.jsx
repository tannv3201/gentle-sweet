import * as React from "react";
import Grid from "@mui/material/Grid";

import Skeleton from "@mui/material/Skeleton";

function ProductSkeleton({ isLoadingSkeleton }) {
    return (
        isLoadingSkeleton && (
            <div style={{ width: "100%" }}>
                <Grid container spacing={3}>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item lg={3} md={6} sm={6} xs={6}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                </Grid>
            </div>
        )
    );
}

export default ProductSkeleton;
