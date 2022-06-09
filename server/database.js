const mysql = require('mysql');
const password = process.env.DATABASE_SPRINT_PASSWORD;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: password,
  database: 'my_db',
  port: '3308'
});

db.connect();

db.query('SELECT * FROM test', (error, result) => {
  if(error){
    return console.log(error, 'check');
  }
  console.log(result);
})