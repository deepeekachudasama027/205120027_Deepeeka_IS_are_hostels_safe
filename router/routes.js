const express = require("express");
const {
  choose_role,
  security_login,
  student_login,
  getmainpage,
  logout,
  generate_otp,
  verify,
} = require("../controllers/login");
const {
  student_getdetails,
  security_getdetails,
} = require("../controllers/register");
const router = express.Router();

router.get("/", getmainpage);

router.post("/security_auth", security_login);

router.post("/student_auth", student_login);

router.get("/logout", logout);

router.get("/student_login", (request, response) => {
  response.render("layouts/student_login");
});

router.get("/security_login", (request, response) => {
  response.render("layouts/security_login");
});

router.get("/role", choose_role);

router.get("/student_registration", (req, res) => {
  res.render("layouts/student_registration");
});

router.get("/security_registration", (req, res) => {
  res.render("layouts/security_registration");
});

router.post("/student_register", student_getdetails);

router.post("/security_register", security_getdetails);

router.post("/generate", generate_otp);

router.post("/verify", verify);

router.post("/visitor", visitor_details);

router.get("/*", (request, response) => {
  response.render("layouts/error");
});

module.exports = router;
