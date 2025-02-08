import mysql from 'mysql2';

// const connection = mysql.createConnection({
//   host: 'localhost',  // your MySQL host (localhost if it's on your machine)
//   user: 'root',       // your MySQL username
//   password: '',       // your MySQL password
//   database: 'mysql-with-nextjs',  // your database name
// });


const connection = mysql.createConnection({
  host: process.env.DB_HOST,  // your MySQL host (localhost if it's on your machine)
  user: process.env.DB_USER,       // your MySQL username
  password: process.env.DB_PASSWORD,       // your MySQL password
  database: process.env.DB_DATABASE,  // your database name
});

export default connection;


// Host: sql12.freesqldatabase.com
// Database name: sql12761710
// Database user: sql12761710
// Database password: Ty5vdmWhvw
// Port number: 3306