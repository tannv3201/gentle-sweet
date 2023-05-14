import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { uploadImage } from "../../../../redux/api/apiImageUpload";
import { useState } from "react";
import GButton from "../../../../components/MyButton/MyButton";

export const MyDropzone = ({ setImageUrls }) => {
    const handleChangeStatus = ({ meta }, status) => {
        // console.log(status, meta);
    };

    const handleSubmit = async (files, allFiles, event) => {
        setImageUrls([]);
        for (let file of files) {
            const formData = new FormData();
            formData.append("image", file?.file);
            const res = await uploadImage(formData);

            if (res) {
                setImageUrls((prevImageUrl) => [...prevImageUrl, res]);
                allFiles.forEach((f) => f.remove());
            }
        }
        event.preven();
    };

    return (
        <>
            <Dropzone
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                maxFiles={3}
                inputContent="Chọn 3 ảnh"
                inputWithFilesContent={(files) => `${3 - files.length} ảnh`}
                submitButtonDisabled={(files) => files.length < 3}
            />
        </>
    );
};
