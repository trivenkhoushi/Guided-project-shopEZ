// cakeController.js
const cakeService = require("../services/cake.service.js")

// Create a new cake
async function createCake(req, res) {
  try {
    const cake = await cakeService.createCake(req.body);
    return res.status(201).json(cake);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Delete a cake by ID
async function deleteCake(req, res) {
  try {
    const cakeId = req.params.id;
    const message = await cakeService.deleteCake(cakeId);
    return res.json({ message });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Update a cake by ID
async function updateCake(req, res) {
  try {
    const cakeId = req.params.id;
    const cake = await cakeService.updateCake(cakeId, req.body);
    return res.json(cake);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all cakes
// async function getAllCakes(req, res) {
//   try {
//     const cakes = await cakeService.getAllCakes();
//     res.json(cakes);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// Find a cake by ID
async function findCakeById(req, res) {
  try {
    const cakeId = req.params.id;
    const cake = await cakeService.findCakeById(cakeId);
    return res.status(200).send(cake);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

// Find cakes by category
async function findCakeByCategory(req, res) {
  try {
    const category = req.params.category;
    const cakes = await cakeService.findCakeByCategory(category);
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Search cakes by query
async function searchCake(req, res) {
  try {
    const query = req.params.query;
    const cakes = await cakeService.searchCake(query);
    res.json(cakes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all cakes with filtering and pagination
async function getAllCakes(req, res) {
  try {

    const cakes = await cakeService.getAllCakes(req.query);

    return res.status(200).send(cakes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const createMultipleCake= async (req, res) => {
  try {
    await cakeService.createMultipleCake(req.body)
    res
      .status(202)
      .json({ message: "Cakes Created Successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  createCake,
  deleteCake,
  updateCake,
  getAllCakes,
  findCakeById,
  findCakeByCategory,
  searchCake,
  createMultipleCake

};
