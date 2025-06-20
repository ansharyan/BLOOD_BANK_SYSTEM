const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");

const bloodGroupDetailsController = async (req, res) => {
  try {
    const bloodGroups = ['O+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'];
    const bloodGroupData = [];

    const organisation = new mongoose.Types.ObjectId(req.userId); // Corrected key

    await Promise.all(bloodGroups.map(async (bloodGroup) => {
      const totalIn = await inventoryModel.aggregate([
        {
          $match: {
            bloodGroup,
            inventoryType: 'in',
            organisation
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$quantity' }
          }
        }
      ]);

      const totalOut = await inventoryModel.aggregate([
        {
          $match: {
            bloodGroup,
            inventoryType: 'out',
            organisation
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$quantity' }
          }
        }
      ]);

      const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

      bloodGroupData.push({
        bloodGroup,
        totalIn: totalIn[0]?.total || 0,
        totalOut: totalOut[0]?.total || 0,
        availableBlood
      });
    }));

    return res.status(200).send({
      success: true,
      message: 'Blood Group Data Fetch',
      bloodGroupData
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in blood group data analytics API',
      error
    });
  }
};

module.exports = { bloodGroupDetailsController };
