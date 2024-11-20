const express = require("express");
const router = express.Router();
const bloodBankController = require("../controllers/bloodBankController");

router.post("/bloodbank", bloodBankController.createEntry);
router.get("/bloodbank", bloodBankController.getAllEntries);
router.get("/bloodbank/:id", bloodBankController.getEntryById);
router.put("/bloodbank/:id", bloodBankController.updateEntry);
router.delete("/bloodbank/:id", bloodBankController.deleteEntry);

router.get("/bloodbank/paginated/:page/:size", bloodBankController.getPaginatedEntries); // Pagination using params
router.get("/bloodbank/search/:bloodType/:status/:donorName", bloodBankController.searchEntries); // Search using params

module.exports = router;
