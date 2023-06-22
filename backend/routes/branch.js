const express = require("express");
const router = express.Router();
const branchController = require("../controllers/branchController");
const middlewareController = require("../controllers/middlewareController");

router.post(
    "/",
    middlewareController.verifyTokenAndSystemUserAuth,
    branchController.createBranch
);

router.get(
    "/",
    // middlewareController.verifyTokenAndSystemUserAuth,
    branchController.getAllBranch
);

router.get(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    branchController.getBranchById
);

router.put(
    "/:id",
    middlewareController.verifyTokenAndSystemUserAuth,
    branchController.updateBranchByID
);

module.exports = router;
