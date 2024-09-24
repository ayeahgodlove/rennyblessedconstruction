const Category = require("../models/category");

class CategoriesController {
  async getAllCategories() {
    try {
      const categories = await Category.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }
  async getCategory(categoryId) {
    try {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        throw Error("Category not found!");
      }
      return category;
    } catch (error) {
      throw error;
    }
  }

  async createCategory(category) {
    try {
      const createdCategory = await Category.create(category);
      return createdCategory;
    } catch (error) {
      throw error;
    }
  }

  async editCategory(category) {
    const { id } = category;
    try {
      const category = await Category.findByPk(id);

      if (!category) {
        throw Error("Category not found!");
      }
      const updatedCategory = await category.update(category);
      return updatedCategory;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error("Category not found");
      }
      await category.destroy();
      return { message: "Category deleted successfully" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoriesController;
