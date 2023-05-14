const InvoiceModel = require("../models/Invoice");
const InvoiceDetailModel = require("../models/InvoiceDetail");
const ProductModel = require("../models/Product");
const pool = require("../config/database");

const { v4: uuidv4 } = require("uuid");

const invoiceController = {
    // GET ALL INVOICE
    getAllInvoice: async (req, res) => {
        try {
            const invoices = await InvoiceModel.getAllInvoice();
            return res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE BY ID
    getInvoiceById: async (req, res) => {
        try {
            const invoice = await InvoiceModel.getInvoiceById(req.params.id);
            if (!invoice) {
                return res.status(404).json("Sản phẩm không tồn tại");
            } else {
                return res.status(200).json(invoice);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createInvoice: async (req, res, next) => {
        try {
            const newInvoice = await InvoiceModel.createInvoice({
                customer_user_id: req.user.id,
                status: 1,
            });

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

            const affectedRows = await InvoiceModel.updateInvoiceById(
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

    // Create invoice detail
    createInvoiceDetail: async (req, res, next) => {
        try {
            const invoice = await InvoiceModel.getInvoiceByCustomerUserId(
                req.user.id
            );

            const getProduct = await ProductModel.getProductById(
                req.body.product_id
            );

            const newInvoiceDetail =
                await InvoiceDetailModel.createInvoiceDetail({
                    id: uuidv4(),
                    invoice_id: invoice?.id,
                    product_id: req.body.product_id,
                    product_quantity: req.body.product_quantity,
                    unit_price: getProduct?.price,
                    status: 1,
                });

            const getAllInvoiceDetails =
                await InvoiceDetailModel.getInvoiceDetailByInvoiceId(
                    invoice?.id
                );

            let total = getAllInvoiceDetails.reduce(
                (accumulator, currentValue) => {
                    let quantity = currentValue.product_quantity;
                    let unitPrice = parseFloat(currentValue.unit_price);
                    return accumulator + quantity * unitPrice;
                },
                0
            );

            const { admin_user_id, ...data } = req.body;
            const affectedRows = await InvoiceModel.updateInvoiceById(
                invoice?.id,
                {
                    price_total: total,
                }
            );
            if (affectedRows !== 0) {
                res.status(201).json(newInvoiceDetail);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // UPDATE INVOICE BY ID
    updateInvoiceById: async (req, res) => {
        try {
            const invoiceId = req.params.id;
            const { admin_user_id, ...data } = req.body;
            const affectedRows = await InvoiceModel.updateInvoiceById(
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

    // DELETE INVOICE BY ID
    deleteInvoiceById: async (req, res) => {
        try {
            const invoiceId = req.params.id;
            const affectedRows = await InvoiceModel.updateInvoiceById(
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
