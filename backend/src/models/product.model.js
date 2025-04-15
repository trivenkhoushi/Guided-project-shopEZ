// productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    // required: true,
  },
  
  description: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  imageUrl: {
    type: String,
  },

   

  // For cake

  flavour: {
    type: String,
  },
  shape: {
    type: String,
    // required: true,
  },
  ingredient: {
    type: String,
    // required: true,
  },
  weight: {
    type: String,
  },

  // for flower

  color: {
    type: String,
  },
  arrangement: {
    type: String,
    // required: true,
  },

  // For Plant

  pot_material: {
    type: String,
  },
  indoor_outdoor: {
    type: String,
    // required: true,
  },


  category: {
    type: String,
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
