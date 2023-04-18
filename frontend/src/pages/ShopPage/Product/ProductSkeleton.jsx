import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

function ProductSkeleton({ isLoadingSkeleton }) {
    return (
        isLoadingSkeleton && (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item xs={3}>
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height={180}
                        />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                    <Grid item xs={3}>
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
