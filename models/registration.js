var pool = require("../controllers/db");

pool.query(
  "CREATE TABLE IF NOT EXISTS registration (rollno int PRIMARY KEY ,password varchar (500),name varchar (50),email varchar (50))",
  (err, result) => {
    if (err) console.log(err);
  }
);

exports.getemail = (email, callback) => {
  return pool.query(
    "select * from  registration WHERE email = $1",
    [email],
    callback
  );
};

exports.getrollno = (rollno, callback) => {
  return pool.query(
    "select * from  registration WHERE rollno = $1",
    [rollno],
    callback
  );
};

exports.updatedetails = (rollno, password, name, email, callback) => {
  return pool.query(
    "Insert into registration (rollno,password,name,email) values ($1,$2,$3,$4) on conflict do nothing ",
    [rollno, password, name,email],
    callback
  );
};

exports.selectrollno = (rollno, callback) => {
  return pool.query(
    "select rollno,password from  registration WHERE rollno = $1 ",
    [rollno],
    callback
  );
};


exports.mainpage = (rollno, callback) => {
  return pool.query(
    "select rollno FROM registration where rollno=$1",
    [rollno],
    callback
  );
};
