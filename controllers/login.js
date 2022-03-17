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


exports.getmainpage=async(request, response, next) => {
  try {
    if (request.session.loggedIn) {
      if( request.session.role== "student")
      response.render("layouts/generate_otp",{
        rollno: request.session.rollno
      })
      if( request.session.role== "security")
      response.render("layouts/verification",{
        empid: request.session.empid
      })
      
    } else 
      response.redirect("/role");
    
  } catch (err) {
    console.log(err);
  }
};

exports.choose_role = async (request, response, next) => {
  try {
    if (request.session.loggedIn)   
      request.redirect("/logout");
      
     else {
      response.render("layouts/choose");
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
          request.session.role= "student";
        request.session.rollno = getrollno.rows[0].rollno;
        response.render("layouts/generate_otp",{
          rollno: request.session.rollno
        })
        }
        else
        {
          response.render("layouts/student_login", {
            message: "Invalid Credentials!",
          });
        }
      } else {
        response.render("layouts/student_login", {
          message: "Invalid Credentials!",
        });
      }
    } else {
      response.render("layouts/student_login", {
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
            request.session.role= "security";
        request.session.empid = getempid.rows[0].empid;
        response.render("layouts/verification",{
          empid: request.session.empid
        })
          }
         else
         {
          response.render("layouts/security_login", {
            message: "Invalid Credentials!",
          });
         }
        }
        else
        {
          response.render("layouts/security_login", {
            message: "Invalid Credentials!",
          });
        }
      } else {
        response.render("layouts/security_login", {
          message: "Invalid Credentials!",
        });
      }
    } else {
      response.render("layouts/security_login", {
        message: "Invalid Credentials!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.verify = async (request, response, next) => {
  try {
    if (request.session.loggedIn) {
        const getmain = await mainpage(request.session.rollno);
        response.render("layout/main", {
          rollno: getmain.rows[0].rollno,
        });
      
    } else {
      response.render("layouts/login", {
        message: "",
      });
    }
  } catch (err) {
    console.log(err);
  }
};


exports.verify = async (request, response, next) => {
  try {
    if (request.session.loggedIn) {
        const getmain = await mainpage(request.session.rollno);
        response.render("layout/main", {
          rollno: getmain.rows[0].rollno,
        });
      
    } else {
      response.render("layouts/login", {
        message: "",
      });
    }
  } catch (err) {
    console.log(err);
  }
};


// exports.getdata = async (request, response, next) => {
//   try {
//     if (request.session.loggedIn) {
//         const getmain = await mainpage(request.session.rollno);
//         response.render("layout/main", {
//           rollno: getmain.rows[0].rollno,
//         });
      
//     } else {
//       response.render("layouts/login", {
//         message: "",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };


exports.logout = async (request, response, next) => {
  try {
    request.session.loggedIn = false;
    request.session.role= "";
    response.render("layouts/login", {
      message: "Logout Successful!",
    });
  } catch (err) {
    console.log(err);
  }
};
