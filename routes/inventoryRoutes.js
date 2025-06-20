const express=require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getRecentInventoryController } = require('../controllers/inventoryController')
const router=express.Router()


router.post('/create-inventory',authMiddleware,createInventoryController)
router.get("/get-inventory",authMiddleware,getInventoryController)

router.get("/get-recent-inventory",authMiddleware,getRecentInventoryController)

router.post("/get-inventory-hospital",authMiddleware,getInventoryHospitalController)
router.get("/get-donars",authMiddleware,getDonarsController)
router.get("/get-hospital",authMiddleware,getHospitalController)
router.get("/get-organisation",authMiddleware,getOrganisationController)
router.get("/get-organisation-for-hospital",authMiddleware,getOrganisationForHospitalController)


module.exports=router