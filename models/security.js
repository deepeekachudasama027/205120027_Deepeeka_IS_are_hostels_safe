var pool = require("../controllers/db");

pool.query(
  "CREATE TABLE IF NOT EXISTS security (empid varchar (9) PRIMARY KEY ,password varchar (500),name varchar (50),email varchar (50), contactno int)",
  (err, result) => {
    if (err) console.log(err);
  }
);

exports.Egetemail = (email, callback) => {
  return pool.query(
    "select * from  security WHERE email = $1",
    [email],
    callback
  );
};

exports.Egetempid = (empid, callback) => {
  return pool.query(
    "select * from  security WHERE empid = $1",
    [empid],
    callback
  );
};

exports.Eupdatedetails = (empid, password, name, email, contactno, callback) => {
  return pool.query(
    "Insert into security (empid,password,name,email,contactno) values ($1,$2,$3,$4,$5) on conflict do nothing ",
    [empid, password, name,email,contactno],
    callback
  );
};

exports.Eselectempid = (empid, callback) => {
  return pool.query(
    "select empid,password from  security WHERE empid = $1 ",
    [empid],
    callback
  );
};


exports.Emainpage = (empid, callback) => {
  return pool.query(
    "select empid FROM security where empid=$1",
    [empid],
    callback
  );
};
