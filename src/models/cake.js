// productModel.js
const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  flavour: {
    type: String,
  },
  discountPersent: {
    type: Number,
  },
  shape: {
    type: String,
    // required: true,
  },
  weight: {
    type: Number,
  },
  description: {
    type: String,
  },
  deliveryinformation: {
    type: String,
  }, 
  imageUrl: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cake = mongoose.model('cake', cakeSchema);

module.exports = Cake;
