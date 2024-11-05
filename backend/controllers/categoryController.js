const CategoryModel = require("../models/CategoryModel");
const categoryValidation = require("../validations/categoryValidation");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json({
      status: "success",
      results: categories.length,
      data: { categories },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) {
      return res
        .status(404)
        .json({ status: "fail", message: "Category not found" });
    }
    res.status(200).json({ status: "success", data: { category } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { error } = categoryValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.message });

    const category = await CategoryModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: { category },
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { error } = categoryValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.message });

    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res
        .status(404)
        .json({ status: "fail", message: "Category not found" });
    }

    res.status(200).json({ status: "success", data: { category } });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(
      req.params.id
    );
    if (!category) {
      return res
        .status(404)
        .json({ status: "fail", message: "Category not found" });
    }
    res.status(204).json({ status: "success", data: null });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};
