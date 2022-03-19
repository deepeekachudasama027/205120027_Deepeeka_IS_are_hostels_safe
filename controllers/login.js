const bcrypt = require("bcryptjs");
var otpGenerator = require("otp-generator");

const { Eselectempid } = require("../models/security");

const { Sselectrollno } = require("../models/student");

const { Ogetrollno, Oupdatedetails, Odatetimediff,Oupdateflag } = require("../models/otp");

const { Vupdatedetails } = require("../models/visitor");

exports.getmainpage = async (request, response, next) => {
  try {
    if (request.session.loggedIn) {
      if (request.session.role == "student")
        response.render("layouts/generate_otp", {
          rollno: request.session.rollno,
        });
      if (request.session.role == "security")
        response.render("layouts/verification", {
          empid: request.session.empid,
        });
    } else response.redirect("/role");
  } catch (err) {
    console.log(err);
  }
};

exports.choose_role = async (request, response, next) => {
  try {
    if (request.session.loggedIn) response.redirect("/logout");
    else response.render("layouts/choose");
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
        const isMatch = await bcrypt.compare(
          password,
          getrollno.rows[0].password
        );
        if (isMatch) {
          request.session.loggedIn = true;
          request.session.role = "student";
          request.session.rollno = getrollno.rows[0].rollno;
          response.render("layouts/generate_otp", {
            rollno: request.session.rollno,
          });
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
    if (`${empid}`.length === 9 && password) {
      const getempid = await Eselectempid(empid);
      if (getempid.rowCount > 0) {
        const isMatch = await bcrypt.compare(
          password,
          getempid.rows[0].password
        );
        if (isMatch) {
          request.session.loggedIn = true;
          request.session.role = "security";
          request.session.empid = getempid.rows[0].empid;
          response.render("layouts/verification", {
            empid: request.session.empid,
          });
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
    } else {
      response.render("layouts/security_login", {
        message: "Invalid Credentials!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.generate_otp = async (request, response, next) => {
  try {
    if (request.session.loggedIn) {
      const generatedOTP = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
      });
      const salt = await bcrypt.genSalt(10);
      const hashOTP = await bcrypt.hash(generatedOTP, salt);

      if (hashOTP) {
        const updatedata = await Oupdatedetails(
          request.session.rollno,
          hashOTP
        );
        if (updatedata) {
          response.render("layouts/generate_otp", {
            rollno: request.session.rollno,
            message: generatedOTP,
          });
        } else {
          response.render("layouts/generate_otp", {
            rollno: request.session.rollno,
            message: "Something wrong happened!",
          });
        }
      } else {
        response.render("layouts/generate_otp", {
          rollno: request.session.rollno,
          message: "Something wrong happened!",
        });
      }
    } else {
      response.render("layouts/student_login", {
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
      const getdata = await Ogetrollno(request.body.rollno);
      if (getdata.rowCount > 0) {
        if(getdata.rows[0].flag == false)
        {
          const getdiff = await Odatetimediff(request.body.rollno);
          if (getdiff.rowCount > 0) {
            const update = await Oupdateflag(request.body.rollno,getdata.rows[0].datetime);
            response.render("layouts/visitor_details", {
              empid: request.session.empid,
              message: "",
            });
          } else {
            response.render("layouts/verification", {
              empid: request.session.empid,
              message: "Session Expired!",
            });
          }
        }
        else 
        {
          response.render("layouts/verification", {
            empid: request.session.empid,
            message: "OTP has been used!",
          });
        }
       
      }
    } else {
      response.render("layouts/security_login", {
        message: "",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.visitor_details = async (request, response, next) => {
  try {
    if (request.session.loggedIn) {
      if (
        request.body.studentrollno >= 100000000 &&
        `${request.body.studentrollno}`.length === 9 &&
        request.body.name &&
        request.body.work &&
        isNaN(request.body.name) &&
        `${request.body.contactno}`.length === 10
      ) {
        const updatedata = await Vupdatedetails(
          request.body.name,
          request.body.contactno,
          request.body.studentrollno,
          request.body.work
        );
        if (updatedata) {
          response.render("layouts/visitor_details", {
            empid:request.session.empid,
            message: "Successfully Submitted!",
          });
        }
      } else
        response.render("layouts/visitor_details", {
          empid:request.session.empid,
          message: "Invalid Credentials!",
        });
    } else {
      response.render("layouts/security_login", {
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
    request.session.role = "";
    response.render("layouts/choose", {
      message: "Logout Successful!",
    });
  } catch (err) {
    console.log(err);
  }
};
