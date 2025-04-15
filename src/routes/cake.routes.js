const express=require("express");
const router=express.Router();
const cakeController=require("../controllers/cake.controller.js");

router.get('/', cakeController.getAllCakes);
router.get('/id/:id', cakeController.findCakeById);
router.get('/search', cakeController.searchCake);


module.exports = router;