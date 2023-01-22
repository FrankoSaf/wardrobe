const router = require("express").Router();
const {
  registrationController,
  loginController,
  emailVerificationController,
} = require("../controllers/authController");
const { isVerified } = require("../middlewares/userVerified");
const {
  userValidationSchema,
  loginValidationSchema,
} = require("../schema/registrationValidation");
const { schemaValidation } = require("../schema/schemaValidation");

router.post(
  "/register",

  userValidationSchema,
  schemaValidation,
  registrationController
);
router.post("/login", loginValidationSchema, schemaValidation, loginController);

router.get("/verify/:id", emailVerificationController);
router.get("/verify", (req, res) => {
  res.send("Verify your account first");
});
module.exports = router;
