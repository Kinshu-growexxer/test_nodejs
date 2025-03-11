const Product = require("../models/Product");
const Review = require("../models/Review");
const { upload } = require("../middleware/upload");

// Add a new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const images = req.files.map((file) => file.path);

    const product = new Product({
      name,
      description,
      price,
      category,
      images,
    });
    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Product not added" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// List all products with filtering, pagination, and sorting
const listProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 10, sort } = req.query;
    const query = category ? { category } : {};
    const sortOptions = sort ? { price: sort === "asc" ? 1 : -1 } : {};

    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("reviews");

    res.json(products);
  } catch (err) {
    res.status(400).json({ message: "Products not found" });
  }
};

// Add a review to a product
// const addReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { rating, comment } = req.body;

//     const review = new Review({ product: id, rating, comment });
//     await review.save();

//     const product = await Product.findById(id);
//     product.reviews.push(review._id);
//     product.averageRating =
//       product.reviews.reduce((sum, r) => sum + r.rating, 0) /
//       product.reviews.length;
//     await product.save();

//     res.status(201).json(review);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

exports.createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { id: productId } = req.params;

    // ✅ Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return next(new AppError("Product not found", 404));
    }

    // ✅ Create a new review
    const review = await Review.create({
      product: productId,
      rating,
      comment,
    });

    // ✅ Calculate the updated average rating
    const reviews = await Review.find({ product: productId });
    const totalRatings = reviews.reduce((sum, rev) => sum + rev.rating, 0);
    product.averageRating = totalRatings / reviews.length;
    await product.save(); // Save updated rating

    res.status(201).json({
      status: "success",
      data: review,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { addProduct, updateProduct, listProducts };
