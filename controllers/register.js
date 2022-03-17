const { Sgetrollno, Supdatedetails,Sgetemail } = require("../models/student");
const { Egetempid, Eupdatedetails,Egetemail } = require("../models/security");
const bcrypt = require("bcryptjs");

exports.student_getdetails = async (req, res, next) => {
  try {
    if (req.body.rollno>=100000000 && `${req.body.rollno}`.length === 9 && req.body.password && req.body.name && req.body.email && isNaN(req.body.name) && `${req.body.contactno}`.length === 10) {
      const getdata = await Sgetrollno(req.body.rollno);
      const getdata_email = await Sgetemail(req.body.email);
      if (getdata.rowCount > 0 || getdata_email.rowCount > 0) {
        res.render("layouts/student_registration", {
          message: "User already exists!",
        })
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);
        const updatedata = await Supdatedetails(
          req.body.rollno,
          hashpassword,
          req.body.name,
          req.body.email,
          req.body.contactno
        )
        if(updatedata){
          res.render("layouts/student_registration", {
            message: "Successfully Registered!",
          })
        }
       
      }
    } else  res.render("layouts/student_registration", {
      message: "Invalid Credentials!",
    })
  } catch (err) {
    next(err)
  }
};


exports.security_getdetails = async (req, res, next) => {
  try {
    if ( `${req.body.empid}`.length === 9 && req.body.password && req.body.name && req.body.email && req.body.key && isNaN(req.body.name) && `${req.body.contactno}`.length === 10) {
      const getdata = await Egetempid(req.body.empid);
      const getdata_email = await Egetemail(req.body.email);
      if (getdata.rowCount > 0 || getdata_email.rowCount > 0) {
        res.render("layouts/security_registration", {
          message: "User already exists!",
        })
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);
        if(req.body.key == process.env.EMPLOYEE_KEY)
          {
            const updatedata = await Eupdatedetails(
              req.body.empid,
              hashpassword,
              req.body.name,
              req.body.email,
              req.body.contactno
            )
            if(updatedata){
              res.render("layouts/security_registration", {
                message: "Successfully Registered!",
              })
            }
          }
          else  res.render("layouts/security_registration", {
            message: "Invalid Credentials!",
          })
       
      }
    } else  res.render("layouts/security_registration", {
      message: "Invalid Credentials!",
    })
  } catch (err) {
    next(err)
  }
};
