const { Sgetrollno, Supdatedetails,Sgetemail } = require("../models/student");
const { Egetempid, Eupdatedetails,Egetemail } = require("../models/registration");
const bcrypt = require("bcryptjs");

// exports.getdetails = async (req, res, next) => {
//   try {
//     if (req.body.rollno>=100000000 && `${req.body.rollno}`.length === 9 && req.body.password && req.body.name && req.body.email && isNaN(req.body.name)) {
//       const getdata = await getrollno(req.body.rollno);
//       const getdata_email = await getemail(req.body.email);
//       if (getdata.rowCount > 0 || getdata_email.rowCount > 0) {
//         res.render("challenges/registration", {
//           message: "User already exists!",
//         })
//       } else {
//         const salt = await bcrypt.genSalt(10);
//         const hashpassword = await bcrypt.hash(req.body.password, salt);
//         const updatedata = await updatedetails(
//           req.body.rollno,
//           hashpassword,
//           req.body.name,
//           req.body.email
//         )
//         if(updatedata){
//           res.render("challenges/registration", {
//             message: "Successfully Registered!",
//           })
//         }
       
//       }
//     } else  res.render("challenges/registration", {
//       message: "Invalid Credentials!",
//     })
//   } catch (err) {
//     next(err)
//   }
// };


exports.student_getdetails = async (req, res, next) => {
  try {
    if (req.body.rollno>=100000000 && `${req.body.rollno}`.length === 9 && req.body.password && req.body.name && req.body.email && isNaN(req.body.name) && `${req.body.contactno}`.length === 10) {
      const getdata = await Sgetrollno(req.body.rollno);
      const getdata_email = await Sgetemail(req.body.email);
      if (getdata.rowCount > 0 || getdata_email.rowCount > 0) {
        res.render("challenges/student_registration", {
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
          res.render("challenges/student_registration", {
            message: "Successfully Registered!",
          })
        }
       
      }
    } else  res.render("challenges/student_registration", {
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
        res.render("challenges/security_registration", {
          message: "User already exists!",
        })
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(req.body.password, salt);
        const hashkey = await bcrypt.hash(req.body.key, salt);
        const updatedata = await Eupdatedetails(
          req.body.rollno,
          hashpassword,
          req.body.name,
          req.body.email,
          hashkey,
          req.body.contactno
        )
        if(updatedata){
          res.render("challenges/security_registration", {
            message: "Successfully Registered!",
          })
        }
       
      }
    } else  res.render("challenges/security_registration", {
      message: "Invalid Credentials!",
    })
  } catch (err) {
    next(err)
  }
};
