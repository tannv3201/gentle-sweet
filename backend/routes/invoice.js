const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");
const middlewareController = require("../controllers/middlewareController");

// Confirm & cancel invoice
router.put(
    "/confirm/:id",
    middlewareController.verifyToken,
    invoiceController.confirmInvoiceById
);

router.put(
    "/cancel/:id",
    middlewareController.verifyToken,
    invoiceController.cancelInvoiceById
);

router.post(
    "/",
    middlewareController.verifyToken,
    invoiceController.createInvoice
);

router.get(
    "/",
    middlewareController.verifyToken,
    invoiceController.getAllInvoice
);

router.get(
    "/status/:id",
    middlewareController.verifyToken,
    invoiceController.getInvoiceByStatus
);

router.get(
    "/search",
    middlewareController.verifyTokenAndSystemUserAuth,
    invoiceController.invoiceSearch
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
