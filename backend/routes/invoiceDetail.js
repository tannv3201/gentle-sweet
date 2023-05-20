const express = require("express");
const router = express.Router();
const invoiceDetailController = require("../controllers/invoiceDetailController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyToken,
    invoiceDetailController.createInvoiceDetail
);

router.get(
    "/",
    middlewareController.verifyToken,
    invoiceDetailController.getAllInvoiceDetail
);

router.get(
    "/:id",
    middlewareController.verifyToken,
    invoiceDetailController.getInvoiceDetailById
);

router.get(
    "/:invoiceId/invoiceDetail",
    middlewareController.verifyToken,
    invoiceDetailController.getInvoiceDetailByInvoiceId
);

router.put(
    "/:id",
    middlewareController.verifyToken,
    invoiceDetailController.updateInvoiceDetailById
);

router.delete(
    "/:id",
    middlewareController.verifyToken,
    invoiceDetailController.deleteInvoiceDetailById
);

module.exports = router;
