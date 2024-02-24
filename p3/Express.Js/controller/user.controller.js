const UserModel = require("../models/user.model");

exports.createUser = async (req, res) => {
  try {
    const { email } = req.body;

    const emailFind = await UserModel.User.findOne({ email });
    if (emailFind) {
      return res.status(406).json({
        message: "Email Already Exists",
        success: false,
      });
    }

    const result = await UserModel.User.create(req.body);
    return res.status(201).json({
      status: 201,
      message: "User was created",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const result = await UserModel.User.find();
    return res.status(201).json({
      status: 200,
      message: "User find successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getUserData = async (req, res) => {
  try {
    const result = await UserModel.User.findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      status: 200,
      message: "User found successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateUserData = async (req, res) => {
  try {
    const result = await UserModel.User.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    if (result.nModified === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      status: 200,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.getUserDataDelete = async (req, res) => {
  try {
    const result = await UserModel.User.updateOne({ _id: req.params.id, is_deleted: { $ne: "deleted" } },
    { $set: { is_deleted: "deleted" } });
    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({
      status: 200,
      message: "User delete successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};