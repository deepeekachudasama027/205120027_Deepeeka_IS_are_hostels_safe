var pool = require("../controllers/db");

pool.query(
  "CREATE TABLE IF NOT EXISTS otp (rollno int PRIMARY KEY ,otp varchar (500), datetime timestamp, flag boolean DEFAULT false)",
  (err, result) => {
    if (err) console.log(err);
  }
);

exports.Ogetrollno = (rollno, callback) => {
  return pool.query("select * from  otp WHERE rollno = $1", [rollno], callback);
};


exports.Oupdatedetails = (rollno, otp, callback) => {
  return pool.query(
    "Insert into otp (rollno,otp,datetime) values ($1,$2,NOW()) on conflict do nothing ",
    [rollno, otp],
    callback
  );
};


exports.Odatetimediff = (rollno, callback) => {
  return pool.query(
    "Select rollno from otp where rollno = $1 and datetime BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW()",
    [rollno],
    callback
  );
};

exports.Oupdateflag = (rollno,datetime, callback) => {
  return pool.query(
    " UPDATE otp SET flag=true where rollno=$1 and datetime=$2",
    [rollno,datetime],
    callback
  );
};