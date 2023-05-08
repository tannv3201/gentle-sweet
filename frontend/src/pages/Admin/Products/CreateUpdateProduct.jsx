import React, { useEffect } from "react";
import axios from "axios";
import { Formik, FastField } from "formik";
import GTextFieldNormal from "../../../components/GTextField/GTextFieldNormal";
import GButton from "../../../components/MyButton/MyButton";
import { Grid } from "@mui/material";
import { useState } from "react";
import GentleTextField from "../../../common/Form/GentleTextField";
import * as Yup from "yup";
const validationSchema = Yup.object({
    title: Yup.string().required("Vui lòng không để trống"),
    category: Yup.string().required("Vui lòng không để trống"),
    price: Yup.number()
        .required("Vui lòng không để trống")
        .positive("Vui lòng nhập số dương")
        .typeError("Vui lòng nhập số")
        .integer("Vui lòng nhập số nguyên"),
    on_sale: Yup.number()
        .required("Vui lòng không để trống")
        .positive("Vui lòng nhập số dương")
        .typeError("Vui lòng nhập số")
        .integer("Vui lòng nhập số nguyên"),
    description: Yup.string().required("Vui lòng không để trống"),
    image: Yup.string().required("Vui lòng không để trống"),
});
function Products() {
    const [product, setProduct] = useState([]);
    const [newProduct, setNewProduct] = useState({
        title: "",
        category: "",
        price: "",
        on_sale: "",
        description: "",
        image: "",
        sold: "",
        rating: undefined,
    });

    useEffect(() => {
        const fetchAllProducts = async () => {
            await axios
                .get("http://localhost:8080/products")
                .then((res) => {
                    setProduct(res.data);
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchAllProducts();
    }, []);

    const handleSubmit = async (newProduct) => {
        try {
            await axios.post("http://localhost:8080/products", newProduct);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Formik
                initialValues={newProduct}
                onSubmit={(values, actions) => {
                    handleSubmit(values);
                    actions.setSubmitting(false);
                }}
                validationSchema={validationSchema}
            >
                {(props) => (
                    <form onSubmit={props.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <GentleTextField
                                    onChange={props.handleChange}
                                    label="Tên sản phẩm"
                                    fullWidth
                                    name="title"
                                    value={props.values.title}
                                    error={
                                        props.touched.title &&
                                        Boolean(props.errors.title)
                                    }
                                    helperText={
                                        props.touched.title &&
                                        props.errors.title
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GentleTextField
                                    onChange={props.handleChange}
                                    label="Giá"
                                    fullWidth
                                    name="price"
                                    value={props.values.price}
                                    error={
                                        props.touched.price &&
                                        Boolean(props.errors.price)
                                    }
                                    helperText={
                                        props.touched.price &&
                                        props.errors.price
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GentleTextField
                                    onChange={props.handleChange}
                                    label="Thể loại"
                                    fullWidth
                                    name="category"
                                    value={props.values.category}
                                    error={
                                        props.touched.category &&
                                        Boolean(props.errors.category)
                                    }
                                    helperText={
                                        props.touched.category &&
                                        props.errors.category
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GentleTextField
                                    onChange={props.handleChange}
                                    label="Giảm giá"
                                    fullWidth
                                    name="on_sale"
                                    value={props.values.on_sale}
                                    error={
                                        props.touched.on_sale &&
                                        Boolean(props.errors.on_sale)
                                    }
                                    helperText={
                                        props.touched.on_sale &&
                                        props.errors.on_sale
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GentleTextField
                                    onChange={props.handleChange}
                                    label="Ảnh"
                                    fullWidth
                                    name="image"
                                    value={props.values.image}
                                    error={
                                        props.touched.image &&
                                        Boolean(props.errors.image)
                                    }
                                    helperText={
                                        props.touched.image &&
                                        props.errors.image
                                    }
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GentleTextField
                                    onChange={props.handleChange}
                                    label="Đã bán"
                                    fullWidth
                                    name="sold"
                                    value={props.values.sold}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <GentleTextField
                                    onChange={props.handleChange}
                                    multiline
                                    label="Mô tả"
                                    fullWidth
                                    name="description"
                                    value={props.values.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <GButton type="submit">Thêm sản phẩm</GButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
            <ul>
                {product?.map((product, idx) => (
                    <li style={{ fontSize: "2rem" }} key={idx}>
                        {product?.title}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Products;
