const bcrypt = require("bcryptjs");
const {
  Egetemail,
  Egetempid,
  Eupdatedetails,
  Eselectempid,
  Emainpage
} = require("../models/security");

const {
  Sgetemail,
  Sgetrollno,
  Supdatedetails,
  Sselectrollno,
  Smainpage
} = require("../models/student");

exports.choose_role = async (request, response, next) => {
  try {
    if (request.session.loggedIn) {
        
      request.session.loggedIn = false;
      response.render("challenges/login", {
        message: "Logout Successful!",
      });
      
    } else {
      response.render("challenges/choose");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.student_login = async (request, response, next) => {
  try {
    var rollno = request.body.rollno;
    var password = request.body.password;
    if (`${rollno}`.length === 9 && rollno >= 100000000 && password) {
      const getrollno = await Sselectrollno(rollno);
      if (getrollno.rowCount > 0) {
        const isMatch = await bcrypt.compare( password,getrollno.rows[0].password);
        if(isMatch){
          request.session.loggedIn = true;
        request.session.rollno = getrollno.rows[0].rollno;
        response.redirect("/");
        }
        else
        {
          response.render("challenges/student_login", {
            message: "Invalid Credentials!",
          });
        }
      } else {
        response.render("challenges/student_login", {
          message: "Invalid Credentials!",
        });
      }
    } else {
      response.render("challenges/student_login", {
        message: "Invalid Credentials!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};


exports.security_login = async (request, response, next) => {
  try {
    var empid = request.body.empid;
    var password = request.body.password;
    var key = request.body.key;
    if (`${empid}`.length === 9 && password && key) {
      const getempid = await Eselectempid(empid);
      if (getempid.rowCount > 0) {
        const isMatch = await bcrypt.compare( password,getrollno.rows[0].password);
        if(isMatch){
          const isKeymatch = await bcrypt.compare( key,getrollno.rows[0].key);
          if(isKeymatch){
            request.session.loggedIn = true;
        request.session.rollno = getrollno.rows[0].rollno;
        response.redirect("/");
          }
         else
         {
          response.render("challenges/security_login", {
            message: "Invalid Credentials!",
          });
         }
        }
        else
        {
          response.render("challenges/security_login", {
            message: "Invalid Credentials!",
          });
        }
      } else {
        response.render("challenges/security_login", {
          message: "Invalid Credentials!",
        });
      }
    } else {
      response.render("challenges/security_login", {
        message: "Invalid Credentials!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// exports.login = async (request, response, next) => {
//   try {
//     var rollno = request.body.rollno;
//     var password = request.body.password;
//     if (`${rollno}`.length === 9 && rollno >= 100000000 && password) {
//       const getrollno = await selectrollno(rollno);
//       if (getrollno.rowCount > 0) {
//         const isMatch = await bcrypt.compare( password,getrollno.rows[0].password);
//         if(isMatch){
//           request.session.loggedIn = true;
//         request.session.rollno = getrollno.rows[0].rollno;
//         response.redirect("/");
//         }
//         else
//         {
//           response.render("challenges/login", {
//             message: "Invalid Credentials!",
//           });
//         }
//       } else {
//         response.render("challenges/login", {
//           message: "Invalid Credentials!",
//         });
//       }
//     } else {
//       response.render("challenges/login", {
//         message: "Invalid Credentials!",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };


exports.getdata = async (request, response, next) => {
  try {
    if (request.session.loggedIn) {
        const getmain = await mainpage(request.session.rollno);
        response.render("layout/main", {
          rollno: getmain.rows[0].rollno,
        });
      
    } else {
      response.render("challenges/login", {
        message: "",
      });
    }
  } catch (err) {
    console.log(err);
  }
};


exports.logout = async (request, response, next) => {
  try {
    request.session.loggedIn = false;
    response.render("challenges/login", {
      message: "Logout Successful!",
    });
  } catch (err) {
    console.log(err);
  }
};
