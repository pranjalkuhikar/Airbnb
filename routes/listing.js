const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Index Route & //Create Route
router
  .route("/")
  .get(asyncErrorHandler(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    asyncErrorHandler(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route & Update Route & Delete Route
router
  .route("/:id")
  .get(asyncErrorHandler(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    asyncErrorHandler(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    asyncErrorHandler(listingController.destroyListing)
  );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  asyncErrorHandler(listingController.renderEditForm)
);

module.exports = router;
