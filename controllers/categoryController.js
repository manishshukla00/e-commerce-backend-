import Category from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exists",
      });
    }
    const category = await new Category({ name, slug: slugify(name) }).save();
    return res
      .status(201)
      .send({ success: true, message: "new Category created", category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, error, message: "Error in Category" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in update", error });
  }
};

export const category = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      return res
        .status(401)
        .send({ success: false, message: "No category stored in database" });
    }
    return res
      .status(200)
      .send({ success: true, message: "All Categories", categories });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting catogeries",
      error,
    });
  }
};

export const categoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res
        .status(404)
        .send({ success: false, message: "No category found by this slug" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Category found by slug", category });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting category by slug",
      error,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    return res.status(200).send({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};
