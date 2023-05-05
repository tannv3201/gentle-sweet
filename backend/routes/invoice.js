const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyToken,
    invoiceController.createInvoice
);

router.post(
    "/invoiceDetail",
    middlewareController.verifyToken,
    invoiceController.createInvoiceDetail
);

router.get(
    "/",
    middlewareController.verifyToken,
    invoiceController.getAllInvoice
);

router.get(
    "/:id",
    middlewareController.verifyToken,
    invoiceController.getInvoiceById
);

router.put(
    "/:id",
    middlewareController.verifyToken,
    invoiceController.updateInvoiceById
);

router.delete(
    "/:id",
    middlewareController.verifyToken,
    invoiceController.deleteInvoiceById
);

module.exports = router;
