import mysql from 'mysql2';

// const connection = mysql.createConnection({
//   host: 'localhost',  // your MySQL host (localhost if it's on your machine)
//   user: 'root',       // your MySQL username
//   password: '',       // your MySQL password
//   database: 'mysql-with-nextjs',  // your database name
// });


const connection = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',  // your MySQL host (localhost if it's on your machine)
  user: 'sql12761710',       // your MySQL username
  password: 'Ty5vdmWhvw',       // your MySQL password
  database: 'sql12761710',  // your database name
});

export default connection;


// Host: sql12.freesqldatabase.com
// Database name: sql12761710
// Database user: sql12761710
// Database password: Ty5vdmWhvw
// Port number: 3306