var pool = require("../controllers/db");

pool.query(
  "CREATE TABLE IF NOT EXISTS visitor (entrytime timestamp PRIMARY KEY ,name VARCHAR(100), contactno bigint, studentrollno int,work varchar(200))",
  (err, result) => {
    if (err) console.log(err);
  }
);

exports.Vupdatedetails = (
  name,
  contactno,
  studentrollno,
  work,
  callback
) => {
  return pool.query(
    "Insert into visitor (entrytime,name,contactno,studentrollno,work) values (NOW(),$1,$2,$3,$4) on conflict do nothing ",
    [name, contactno, studentrollno, work],
    callback
  );
};
