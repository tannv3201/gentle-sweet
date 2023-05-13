import React from "react";
import GButton from "../../../../components/MyButton/MyButton";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { uploadImage } from "../../../../redux/apiRequest";
import { useFormikContext } from "formik";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { Grid } from "@mui/material";
function UploadImage({
    handleFileInputChange,
    imageUrl,
    handleUploadButtonClick,
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
                {/* {imageUrl && (
                    <Grid item xs={12}>
                        <GButton
                            startIcon={<FileUploadRoundedIcon />}
                            color={"info"}
                            onClick={handleUploadButtonClick}
                            variant="outlined"
                        >
                            Tải lên
                        </GButton>
                    </Grid>
                )} */}
            </Grid>
        </>
    );
}

export default UploadImage;
