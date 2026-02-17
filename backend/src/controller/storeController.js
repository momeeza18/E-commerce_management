const Store = require("../model/storeSchema");

exports.createStore = async (req, res) => {
  try {
    const { name, location } = req.body;
    const newStore = new Store({
      name,
      location,
      created_by: req.user.userId,
    });

    const updatedStore = await newStore.save();
    return res
      .status(201)
      .json({ message: "Store created Successfully", store: updatedStore });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating store",
      error: err.message,
    });
  }
};
exports.getAllStores = async (req, res) => {
  try {
    const Stores = await Store.find({}).populate("created_by");
    res
      .status(200)
      .json({ message: "All Stores fetched successfully", Stores });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error Fetching Users", error: error.message });
  }
};
