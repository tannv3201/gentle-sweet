import React from "react";
import ImageUploading from "react-images-uploading";
import "./styles.css";
import GButton from "../../../../components/MyButton/MyButton";
import {
    Image,
    ModeEditRounded,
    HighlightOffRounded,
    DeleteRounded,
} from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
export function ImageUpload({
    setImageFileSeleted,
    imageFileSeleted,
    onChangeImage,
}) {
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;

    // const onChange = (imageList, addUpdateIndex) => {
    //     // data for submit
    //     console.log(imageList, addUpdateIndex);
    //     if (imageFileSeleted?.length === 0) {
    //         setImages([]);
    //     } else {
    //         setImages(imageList);
    //     }
    //     setImageFileSeleted(imageList);
    // };
    console.log(imageFileSeleted);
    console.log(images);
    return (
        <div className="App">
            <ImageUploading
                value={imageFileSeleted}
                onChange={(imageList, addUpdateIndex) =>
                    onChangeImage(imageList, addUpdateIndex)
                }
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <Grid
                        container
                        spacing={2}
                        className="upload__image-wrapper"
                    >
                        <Grid item xs={12}>
                            <GButton
                                startIcon={<Image />}
                                style={
                                    isDragging ? { color: "red" } : undefined
                                }
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Chọn ảnh
                            </GButton>
                            &nbsp;
                            {imageFileSeleted.length !== 0 && (
                                <GButton
                                    startIcon={<DeleteRounded />}
                                    color={"error"}
                                    onClick={onImageRemoveAll}
                                >
                                    Xóa tất cả
                                </GButton>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <Grid container spacing={2}>
                                    {imageList.map((image, index) => (
                                        <Grid key={index} item xs={6}>
                                            <div
                                                style={{ width: "100%" }}
                                                className="image-item"
                                            >
                                                <div className="button-wrapper">
                                                    <IconButton
                                                        className="remove-btn"
                                                        onClick={() =>
                                                            onImageRemove(index)
                                                        }
                                                    >
                                                        <HighlightOffRounded color="error" />
                                                    </IconButton>
                                                    <IconButton
                                                        color="red"
                                                        className="edit-btn"
                                                        onClick={() =>
                                                            onImageUpdate(index)
                                                        }
                                                    >
                                                        <ModeEditRounded color="success" />
                                                    </IconButton>
                                                </div>
                                                <img
                                                    src={image["data_url"]}
                                                    alt=""
                                                    className="image"
                                                    width="100%"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                />
                                            </div>
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                )}
            </ImageUploading>
        </div>
    );
}
