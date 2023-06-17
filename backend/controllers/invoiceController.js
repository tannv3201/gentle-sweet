const InvoiceModel = require("../models/Invoice");
const InvoiceDetailModel = require("../models/InvoiceDetail");
const ProductModel = require("../models/Product");
const pool = require("../config/database");

const { v4: uuidv4 } = require("uuid");

const invoiceController = {
    invoiceSearch: async (req, res) => {
        try {
            const { status, startDate, endDate, customer_user_id } = req.query;

            const params = {};
            if (status) params.status = status;
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
            if (customer_user_id) params.customer_user_id = customer_user_id;

            const invoices = await InvoiceModel.invoiceSearch(params);
            if (!invoices) {
                return res.status(404).json("Đơn hàng không tồn tại");
            } else {
                return res.status(200).json(invoices);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

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

    getInvoiceByUserId: async (req, res) => {
        try {
            const invoices = await InvoiceModel.getInvoiceByCustomerUserId(
                req.params.id
            );
            if (!invoices) {
                return res.status(404).json("Đơn hàng không tồn tại");
            } else {
                return res.status(200).json(invoices);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // GET INVOICE BY STATUS
    getInvoiceByStatus: async (req, res) => {
        try {
            const invoices = await InvoiceModel.getAllInvoiceByStatus(
                req.params.id
            );
            return res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // Create Product Category
    createInvoice: async (req, res, next) => {
        try {
            const newInvoice = await InvoiceModel.createInvoice({
                customer_user_id: req.body.customer_user_id,
                admin_user_id: req.body.admin_user_id,
                note: req.body.note,
                status: 1,
            });
            res.json({
                status: 201,
                msg: "Tạo đơn hàng thành công",
                data: newInvoice,
            });
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

            if (req.body.status === 6) {
                const productInvoiceCancel =
                    await InvoiceModel.getProductInvoiceCancel(req.params.id);

                for (const p of productInvoiceCancel) {
                    await ProductModel.updateProductById(p?.id, {
                        quantity: p?.quantity + p?.quantityPurchased,
                    });
                }
            }

            if (affectedRows === 0) {
                return res.json({ status: 404, msg: "Cập nhật thất bại" });
            } else {
                return res.json({ status: 200, msg: "Cập nhật thành công" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // CONFIRM INVOICE BY ID
    confirmInvoiceById: async (req, res) => {
        try {
            const invoiceId = req.params.id;
            const { admin_user_id, ...data } = req.body;
            const affectedRows = await InvoiceModel.updateInvoiceById(
                invoiceId,
                {
                    status: 2,
                    admin_user_id: admin_user_id,
                }
            );
            if (affectedRows === 0) {
                return res.json({ status: 404, msg: "Cập nhật thất bại" });
            } else {
                return res.json({
                    status: 200,
                    msg: "Xác nhận đơn hàng thành công",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    // CANCEL INVOICE BY ID
    cancelInvoiceById: async (req, res) => {
        try {
            const invoiceId = req.params.id;
            const { admin_user_id, ...data } = req.body;
            const affectedRows = await InvoiceModel.updateInvoiceById(
                invoiceId,
                {
                    status: req.body.status,
                    note: req.body.note,
                }
            );
            if (affectedRows === 0) {
                return res.json({ status: 404, msg: "Cập nhật thất bại" });
            } else {
                return res.json({
                    status: 200,
                    msg: "Hủy đơn hàng thành công",
                });
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
                return res.json({ status: 404, msg: "Xóa thất bại" });
            } else {
                return res.json({ status: 200, msg: "Xóa thành công" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = invoiceController;
