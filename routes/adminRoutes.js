const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const { getDonarListController, getHospitalListController, getOrgListController, deleteDonarController } = require('../controllers/adminController');
const { getHospitalController } = require('../controllers/inventoryController');

const router=express.Router();


router.get('/donar-list',authMiddleware,adminMiddleware,getDonarListController)
router.get('/hospital-list',authMiddleware,adminMiddleware,getHospitalListController)

router.get('/org-list',authMiddleware,adminMiddleware,getOrgListController)

router.delete('/delete-donar/:id',authMiddleware,adminMiddleware,deleteDonarController)



module.exports=router