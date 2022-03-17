const express = require("express");
const {
  choose_role,
  security_login,
  student_login,
  getmainpage,
  logout,
} = require("../controllers/login");
const { student_getdetails,
  security_getdetails} = require("../controllers/register")
const router = express.Router();

router.get("/",getmainpage);

router.post("/security_auth", security_login);

router.post("/student_auth", student_login);

router.get("/logout", logout);

router.get("/student_login",(request,response)=>{
  response.render("layouts/student_login");
})

router.get("/security_login",(request,response)=>{
  response.render("layouts/security_login");
})

// router.get("/login", (request, response) => {
//   response.render("layouts/login");
// });

router.get("/role", choose_role);

router.get("/student_registration", (req, res) => {
  res.render("layouts/student_registration");
});

router.get("/security_registration", (req, res) => {
  res.render("layouts/security_registration");
});

router.get("/registration", (req, res) => {
    res.render("layouts/registration");
  });

  router.post("/student_register", student_getdetails);

  router.post("/secutiy_register", security_getdetails);
  

router.get("/*", (request, response) => {
  response.render("layouts/error");
});


module.exports = router;
