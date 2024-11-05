const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

router
router
  .route("/:id")
  .get(categoryController.getCategory)
  .put(categoryController.updateCategory) // Change to PUT
  .delete(categoryController.deleteCategory);


module.exports = router;
