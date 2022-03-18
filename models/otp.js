var pool = require("../controllers/db");

pool.query(
  "CREATE TABLE IF NOT EXISTS otp (rollno int PRIMARY KEY ,otp varchar (500), datetime timestamp)",
  (err, result) => {
    if (err) console.log(err);
  }
);

// exports.Sgetemail = (email, callback) => {
//   return pool.query(
//     "select * from  student WHERE email = $1",
//     [email],
//     callback
//   );
// };

exports.Ogetrollno = (rollno, callback) => {
  return pool.query(
    "select * from  otp WHERE rollno = $1",
    [rollno],
    callback
  );
};

exports.Oupdatedetails = (rollno, otp, datetime, callback) => {
  return pool.query(
    "Insert into otp (rollno,otp,datetime) values ($1,$2,to_timestamp($3 / 1000.0)) on conflict do nothing ",
    [rollno, otp,datetime],
    callback
  );
};

// exports.Sselectrollno = (rollno, callback) => {
//   return pool.query(
//     "select rollno,password from  student WHERE rollno = $1 ",
//     [rollno],
//     callback
//   );
// };


// exports.Smainpage = (rollno, callback) => {
//   return pool.query(
//     "select rollno FROM student where rollno=$1",
//     [rollno],
//     callback
//   );
// };
