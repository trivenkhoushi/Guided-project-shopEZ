const Category = require("../models/category.model");
const Product = require("../models/product.model");

// Create a new product
async function createProduct(reqData) {

  // if (!topLevel) {
  //   const topLavelCategory = new Category({
  //     name: reqData.topLavelCategory,
  //     level: 1,
  //   });

  //   topLevel = await topLavelCategory.save();
  // }

  // let secondLevel = await Category.findOne({
  //   name: reqData.secondLavelCategory,
  //   parentCategory: topLevel._id,
  // });

  // if (!secondLevel) {
  //   const secondLavelCategory = new Category({
  //     name: reqData.secondLavelCategory,
  //     parentCategory: topLevel._id,
  //     level: 2,
  //   });

  //   secondLevel = await secondLavelCategory.save();
  // }

  // let thirdLevel = await Category.findOne({
  //   name: reqData.thirdLavelCategory,
  //   parentCategory: secondLevel._id,
  // });

  // if (!thirdLevel) {
  //   const thirdLavelCategory = new Category({
  //     name: reqData.thirdLavelCategory,
  //     parentCategory: secondLevel._id,
  //     level: 3,
  //   });

  //   thirdLevel = await thirdLavelCategory.save();
  // }

  const product = new Product({ ...reqData });

  const savedProduct = await product.save();

  console.log(savedProduct)
  return savedProduct;
}
// Delete a product by ID
async function deleteProduct(productId) {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("product not found with id - : ", productId);
  }

  await Product.findByIdAndDelete(productId);

  return "Product deleted Successfully";
}

// Update a product by ID
async function updateProduct(productId, reqData) {
  const updatedProduct = await Product.findByIdAndUpdate(productId, reqData);
  return updatedProduct;
}

// Find a product by ID
async function findProductById(id) {
  const product = await Product.findById(id).populate("category").exec();

  if (!product) {
    throw new Error("Product not found with id " + id);
  }
  return product;
}

// Get all products with filtering and pagination
async function getAllProducts(reqQuery) {
  let query = Product.find();
  const products = await query.exec();

  return { content: products};
}

async function createMultipleProduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct,
};
