import axios from "axios";
import toast from "react-hot-toast";

export const uploadImage = async (formData) => {
    try {
        const res = await axios.post(
            "https://api.imgbb.com/1/upload",
            formData,
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
                params: {
                    key: "a1376c9fbddb6821bb0a0d7884359357",
                },
            }
        );
        if (res.data?.data?.display_url) {
            toast.success("Thêm ảnh lên máy chủ thành công.");
        }
        return res.data?.data?.display_url;
    } catch (error) {
        console.log(error);
    }
};
