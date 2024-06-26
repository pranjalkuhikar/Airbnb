const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");
const ReviewController = require("../controllers/reviews.js");

const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

// Post Review Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  asyncErrorHandler(ReviewController.createReview)
);

// Review Delete Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  asyncErrorHandler(ReviewController.destroyReview)
);

module.exports = router;
