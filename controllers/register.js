const { Sgetrollno, Supdatedetails, Sgetemail } = require("../models/student");
const { Egetempid, Eupdatedetails, Egetemail } = require("../models/security");
const bcrypt = require("bcryptjs");

exports.student_getdetails = async (request, response, next) => {
  try {
    if (
      request.body.rollno >= 100000000 &&
      `${request.body.rollno}`.length === 9 &&
      request.body.password &&
      request.body.name &&
      request.body.email &&
      isNaN(request.body.name) &&
      `${request.body.contactno}`.length === 10
    ) {
      const getdata = await Sgetrollno(request.body.rollno);
      const getdata_email = await Sgetemail(request.body.email);
      if (getdata.rowCount > 0 || getdata_email.rowCount > 0) {
        response.render("layouts/student_registration", {
          message: "User already exists!",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(request.body.password, salt);
        const updatedata = await Supdatedetails(
          request.body.rollno,
          hashpassword,
          request.body.name,
          request.body.email,
          request.body.contactno
        );
        if (updatedata) {
          response.render("layouts/student_registration", {
            message: "Successfully Registered!",
          });
        }
      }
    } else
      response.render("layouts/student_registration", {
        message: "Invalid Credentials!",
      });
  } catch (err) {
    next(err);
  }
};

exports.security_getdetails = async (request, response, next) => {
  try {
    if (
      `${request.body.empid}`.length === 9 &&
      request.body.password &&
      request.body.name &&
      request.body.email &&
      request.body.key &&
      isNaN(request.body.name) &&
      `${request.body.contactno}`.length === 10
    ) {
      const getdata = await Egetempid(request.body.empid);
      const getdata_email = await Egetemail(request.body.email);
      if (getdata.rowCount > 0 || getdata_email.rowCount > 0) {
        response.render("layouts/security_registration", {
          message: "User already exists!",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(request.body.password, salt);
        if (request.body.key == process.env.EMPLOYEE_KEY) {
          const updatedata = await Eupdatedetails(
            request.body.empid,
            hashpassword,
            request.body.name,
            request.body.email,
            request.body.contactno
          );
          if (updatedata) {
            response.render("layouts/security_registration", {
              message: "Successfully Registered!",
            });
          }
        } else
          response.render("layouts/security_registration", {
            message: "Invalid Credentials!",
          });
      }
    } else
      response.render("layouts/security_registration", {
        message: "Invalid Credentials!",
      });
  } catch (err) {
    next(err);
  }
};
