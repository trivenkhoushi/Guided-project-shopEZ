const express=require("express");
const router=express.Router();
const cakeController=require("../controllers/cake.controller.js");


router.post('/', cakeController.createCake);
router.post('/creates', cakeController.createMultipleCake);
router.delete('/:id', cakeController.deleteCake);
router.put('/:id', cakeController.updateCake);

module.exports=router;