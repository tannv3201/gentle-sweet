const InvoiceModel = require("../models/Invoice");
const InvoiceDetailModel = require("../models/InvoiceDetail");
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
                return res.status(404).json("Chi tiết hóa đơn không tồn tại");
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
            const getProduct = await ProductModel.getProductById(
                req.body.product_id
            );

            const newInvoiceDetail =
                await InvoiceDetailModel.createInvoiceDetail({
                    id: uuidv4(),
                    invoice_id: newInvoice.id,
                    product_id: req.body.product_id,
                    product_quantity: req.body.product_quantity,
                    unit_price: getProduct?.price,
                    status: 1,
                });

            let price_total =
                newInvoiceDetail?.product_quantity *
                newInvoiceDetail?.unit_price;

            const { admin_user_id, ...data } = req.body;
            const affectedRows = await InvoiceDetailModel.updateInvoiceById(
                newInvoice?.id,
                {
                    price_total: price_total,
                }
            );
            if (affectedRows !== 0) {
                res.status(201).json(newInvoice);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE INVOICE DETAIL BY ID
    updateInvoiceById: async (req, res) => {
        try {
            const invoiceId = req.params.id;
            const { admin_user_id, ...data } = req.body;
            const affectedRows = await InvoiceDetailModel.updateInvoiceById(
                invoiceId,
                data
            );
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Cập nhật thất bại" });
            } else {
                return res.status(200).json({ message: "Cập nhật thành công" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // DELETE INVOICE DETAIL BY ID
    deleteInvoiceById: async (req, res) => {
        try {
            const invoiceId = req.params.id;
            const affectedRows = await InvoiceDetailModel.updateInvoiceById(
                invoiceId,
                { status: 0 }
            );
            if (affectedRows === 0) {
                return res.status(404).json({ message: "Xóa thất bại" });
            } else {
                return res.status(200).json({ message: "Xóa thành công" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = invoiceController;
