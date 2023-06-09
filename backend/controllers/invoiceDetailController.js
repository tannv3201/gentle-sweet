const InvoiceDetailModel = require("../models/InvoiceDetail");
const InvoiceModel = require("../models/Invoice");
const ProductModel = require("../models/Product");

const { v4: uuidv4 } = require("uuid");

const invoiceController = {
    // GET ALL INVOICE DETAIL
    getAllInvoiceDetail: async (req, res) => {
        try {
            const invoiceDetails =
                await InvoiceDetailModel.getAllInvoiceDetail();
            return res.status(200).json(invoiceDetails);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE DETAIL BY ID
    getInvoiceDetailById: async (req, res) => {
        try {
            const invoiceDetail = await InvoiceDetailModel.getInvoiceDetailById(
                req.params.id
            );
            if (!invoiceDetail) {
                return res.status(404).json("Chi tiết đơn hàng không tồn tại");
            } else {
                return res.status(200).json(invoiceDetail);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE DETAIL BY ID
    getInvoiceDetailByInvoiceId: async (req, res) => {
        try {
            const invoiceDetail =
                await InvoiceDetailModel.getInvoiceDetailByInvoiceId(
                    req.params.invoiceId
                );
            if (!invoiceDetail) {
                return res.status(404).json("Chi tiết đơn hàng không tồn tại");
            } else {
                return res.status(200).json(invoiceDetail);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createInvoiceDetail: async (req, res, next) => {
        try {
            const newInvoiceDetail =
                await InvoiceDetailModel.createInvoiceDetail({
                    invoice_id: req.body.invoice_id,
                    product_id: req.body.product_id,
                    product_quantity: req.body.product_quantity,
                    unit_price: req.body.unit_price,
                });
            const checkPriceTotal = await InvoiceDetailModel.checkPriceTotal(
                req.body.invoice_id
            );
            const updateTotalPrice =
                await InvoiceDetailModel.updatePriceTotalInvoice(
                    req.body.invoice_id,
                    parseInt(checkPriceTotal?.total_price) >= 500000
                        ? 0
                        : req.body.deliveryPrice
                );

            const getProductAddedInvoice = await ProductModel.getProductById(
                req.body.product_id
            );
            const updateProductAddedQuantity =
                await ProductModel.updateProductById(req.body.product_id, {
                    quantity:
                        parseInt(getProductAddedInvoice?.quantity) -
                        parseInt(req.body.product_quantity),
                });

            return res.json({
                status: 201,
                msg: "Thêm mới thành công",
                data: newInvoiceDetail,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE INVOICE DETAIL BY ID
    updateInvoiceDetailById: async (req, res) => {
        try {
            const invoiceDetailId = req.params.id;
            const { admin_user_id, invoice_id, ...data } = req.body;
            const affectedRows =
                await InvoiceDetailModel.updateInvoiceDetailById(
                    invoiceDetailId,
                    data
                );

            await InvoiceDetailModel.updatePriceTotalInvoice(invoice_id);
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Cập nhật thất bại" });
            } else {
                return res.json({ status: 200, msg: "Cập nhật thành công" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // DELETE INVOICE DETAIL BY ID
    // deleteInvoiceById: async (req, res) => {
    //     try {
    //         const invoiceId = req.params.id;
    //         const affectedRows = await InvoiceDetailModel.updateInvoiceById(
    //             invoiceId,
    //             { status: 0 }
    //         );
    //         if (affectedRows === 0) {
    //             return res.status(404).json({ message: "Xóa thất bại" });
    //         } else {
    //             return res.status(200).json({ message: "Xóa thành công" });
    //         }
    //     } catch (error) {
    //         res.status(500).json({ message: error.message });
    //     }
    // },

    // DELETE INVOICE DETAIL BY ID
    deleteInvoiceDetailById: async (req, res) => {
        try {
            const getDeleteInvoiceDetail =
                await InvoiceDetailModel.getInvoiceDetailById(req.params.id);

            const affectedRows =
                await InvoiceDetailModel.deleteInvoiceDetailById(req.params.id);

            const invoiceDetailByInvoice =
                await InvoiceDetailModel.getInvoiceDetailByInvoiceId(
                    getDeleteInvoiceDetail?.invoice_id
                );

            if (invoiceDetailByInvoice?.length !== 0) {
                await InvoiceDetailModel.updatePriceTotalInvoice(
                    getDeleteInvoiceDetail?.invoice_id
                );
            } else {
                await InvoiceModel.updateInvoiceById(
                    getDeleteInvoiceDetail?.invoice_id,
                    {
                        price_total: 0,
                    }
                );
            }

            if (affectedRows === 0) {
                return res.status(404).json({ message: "Xóa thất bại" });
            } else {
                return res.json({ status: 200, msg: "Xóa thành công" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = invoiceController;
