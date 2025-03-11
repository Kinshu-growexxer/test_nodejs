const express = require("express");
const {
  addProduct,
  updateProduct,
  listProducts,
  createReview,
  getProductReviews,
} = require("../controllers/productController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/", upload.array("images", 5), addProduct);
router.patch("/:id", updateProduct);
router.get("/", listProducts);
router.route("/:id").patch(updateProduct);
// router.route("/:id/reviews").post(createReview).get(getProductReviews);

module.exports = router;
