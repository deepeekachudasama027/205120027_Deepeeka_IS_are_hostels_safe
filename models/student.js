var pool = require("../controllers/db");

pool.query(
  "CREATE TABLE IF NOT EXISTS student (rollno int PRIMARY KEY ,password varchar (500),name varchar (50),email varchar (50),contactno bigint)",
  (err, result) => {
    if (err) console.log(err);
  }
);

exports.Sgetemail = (email, callback) => {
  return pool.query(
    "select * from  student WHERE email = $1",
    [email],
    callback
  );
};

exports.Sgetrollno = (rollno, callback) => {
  return pool.query(
    "select * from  student WHERE rollno = $1",
    [rollno],
    callback
  );
};

exports.Supdatedetails = (rollno, password, name, email,contactno, callback) => {
  return pool.query(
    "Insert into student (rollno,password,name,email,contactno) values ($1,$2,$3,$4,$5) on conflict do nothing ",
    [rollno, password, name,email,contactno],
    callback
  );
};

exports.Sselectrollno = (rollno, callback) => {
  return pool.query(
    "select rollno,password from  student WHERE rollno = $1 ",
    [rollno],
    callback
  );
};


exports.Smainpage = (rollno, callback) => {
  return pool.query(
    "select rollno FROM student where rollno=$1",
    [rollno],
    callback
  );
};
