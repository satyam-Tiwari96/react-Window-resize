const express = require("express");
const router = express.Router();
const roleCtrl = require("../controller/user.controller");

router.post("/create", roleCtrl.createUser);
router.get("/get_user", roleCtrl.getUser);
router.get('/get_user/:id', roleCtrl.getUserData);
router.delete('/get_user/:id', roleCtrl.getUserDataDelete);
router.put('/get_user/:id', roleCtrl.updateUserData);

module.exports = router;
