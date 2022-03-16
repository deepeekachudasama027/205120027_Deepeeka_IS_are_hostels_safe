const express = require("express");
const {
  // login,
  // getdata,
  choose_role,
  security_login,
  student_login,
  logout,
} = require("../controllers/login");
const { student_getdetails,
  security_getdetails} = require("../controllers/register")
const router = express.Router();

// router.post("/auth", login);

router.post("/security_auth", security_login);

router.post("/student_auth", student_login);

router.get("/logout", logout);

router.get("/student",(request,response)=>{
  response.render("challenges/student_login");
})

router.get("/security",(request,response)=>{
  response.render("challenges/security_login");
})

router.get("/login", (request, response) => {
  response.render("challenges/login");
});

router.get("/role", choose_role);

router.get("/student_registration", (req, res) => {
  res.render("challenges/student_registration");
});

router.get("/security_registration", (req, res) => {
  res.render("challenges/security_registration");
});

router.get("/registration", (req, res) => {
    res.render("challenges/registration");
  });

  router.post("/student_register", student_getdetails);

  router.post("/secutiy_register", security_getdetails);
  
// router.post("/register", getdetails);

router.get("/*", (request, response) => {
  response.render("challenges/error");
});


module.exports = router;
