const Category = require("../models/category.model");
const Cake = require("../models/cake");

// Create a new cake
async function createCake(reqData) {
  let topLevel = await Category.findOne({ name: reqData.topLavelCategory });

  if (!topLevel) {
    const topLavelCategory = new Category({
      name: reqData.topLavelCategory,
      level: 1,
    });

    topLevel = await topLavelCategory.save();
  }

  let secondLevel = await Category.findOne({
    name: reqData.secondLavelCategory,
    parentCategory: topLevel._id,
  });

  if (!secondLevel) {
    const secondLavelCategory = new Category({
      name: reqData.secondLavelCategory,
      parentCategory: topLevel._id,
      level: 2,
    });

    secondLevel = await secondLavelCategory.save();
  }

  let thirdLevel = await Category.findOne({
    name: reqData.thirdLavelCategory,
    parentCategory: secondLevel._id,
  });

  if (!thirdLevel) {
    const thirdLavelCategory = new Category({
      name: reqData.thirdLavelCategory,
      parentCategory: secondLevel._id,
      level: 3,
    });

    thirdLevel = await thirdLavelCategory.save();
  }

  const cake = new Cake({
    title: reqData.title,
    type: reqData.type,
    description: reqData.description,
    discountPersent: reqData.discountPersent,
    imageUrl: reqData.imageUrl,
    flavour: reqData.flavour,
    price: reqData.price,
    shape: reqData.shape,
    weight: reqData.weight,
    deliveryinformation :reqData.deliveryinformation,
    category: thirdLevel._id,
  });

  const savedCake = await cake.save();

  return savedCake;
}
// Delete a cake by ID
async function deleteCake(cakeId) {
  const cake = await findCakeById(cakeId);

  if (!cake) {
    throw new Error("cake not found with id - : ", cakeId);
  }

  await Cake.findByIdAndDelete(cakeId);

  return "cake deleted Successfully";
}

// Update a cake by ID
async function updateCake(cakeId, reqData) {
  const updatedcake = await Cake.findByIdAndUpdate(cakeId, reqData);
  return updatedcake;
}

// Find a cake by ID
async function findCakeById(id) {
  const cake = await Cake.findCakeById(id).populate("category").exec();

  if (!cake) {
    throw new Error("cake not found with id " + id);
  }
  return cake;
}

// Get all Cake with filtering and pagination
async function getAllCakes(reqQuery) {
  let {
    category,
    title,
    type,
    price,
    flavour,
    discountPersent,
    shape,
    weight,
    description,
    deliveryinformation,
    pageNumber,
    pageSize,
  } = reqQuery;
  (pageSize = pageSize || 10), (pageNumber = pageNumber || 1);
  let query = Cake.find().populate("category");


  if (category) {
    const existCategory = await Category.findOne({ name: category });
    if (existCategory)
      query = query.where("category").equals(existCategory._id);
    else return { content: [], currentPage: 1, totalPages:1 };
  }

//   if (color) {
//     const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
//     const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
//     query = query.where("color").regex(colorRegex);
//     // query = query.where("color").in([...colorSet]);
//   }

  if (shape) {
    const shapeSet = new Set(shape);
    
    query = query.where("shape.name").in([...shapeSet]);
  }

//   if (minPrice && maxPrice) {
//     query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
//   }

  if (discountPersent) {
    query = query.where("discountPersent").gt(discountPersent);
  }

  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").lte(0);
    }
  }

  if (sort) {
    const sortDirection = sort === "price_high" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  // Apply pagination
  const totalCakes = await Cake.countDocuments(query);

  const skip = (pageNumber - 1) * pageSize;

  query = query.skip(skip).limit(pageSize);

  const cakes = await query.exec();

  const totalPages = Math.ceil(totalCakes / pageSize);


  return { content: cakes, currentPage: pageNumber, totalPages:totalPages };
}

async function createMultipleCake(cakes) {
  for (let cake of cakes) {
    await createCake(cake);
  }
}

module.exports = {
  createCake ,
  deleteCake ,
  updateCake ,
  getAllCakes,
  findCakeById,
  createMultipleCake ,
};
