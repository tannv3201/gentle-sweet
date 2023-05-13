import React from "react";
import GButton from "../../../../components/MyButton/MyButton";
import { PhotoCamera } from "@mui/icons-material";

import { Grid } from "@mui/material";
function UploadImage({
    handleFileInputChange,
    imageUrl,
    handleUploadButtonClick,
    helpertext,
}) {
    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                <GButton
                                    startIcon={<PhotoCamera />}
                                    component="label"
                                    color={"info"}
                                    variant="outlined"
                                >
                                    Chọn ảnh
                                    <input
                                        onChange={handleFileInputChange}
                                        hidden
                                        accept="image/*"
                                        multiple
                                        type="file"
                                    />
                                </GButton>
                            </Grid>
                            {!imageUrl && (
                                <Grid item xs={12}>
                                    <span
                                        style={{
                                            color: "red",
                                            fontSize: "1.5rem",
                                        }}
                                    >
                                        {helpertext}
                                    </span>
                                </Grid>
                            )}
                            {imageUrl && (
                                <Grid item xs={6}>
                                    <img
                                        style={{
                                            height: "60px",
                                            width: "60px",
                                            objectFit: "cover",
                                        }}
                                        src={imageUrl}
                                        alt="Uploaded"
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

export default UploadImage;
