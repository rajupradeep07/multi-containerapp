const mysql = require('mysql2');
const http = require('http');

// Define the connection details
const dbConfig = {
  host: 'db', 
  user: 'root',
  password: '123'
};

console.log('App is waiting 10 seconds for DB to wake up...');

// Wrap everything in a timeout to give the DB time to boot
setTimeout(() => {
  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error('Final connection failed:', err.message);
      process.exit(1); // Exit if it still fails after 10s
    }
    console.log('Connected to Database successfully!');

    const server = http.createServer((req, res) => {
      connection.query('SELECT NOW() AS time', (err, results) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        if (err) {
          res.end(`<h1>Error querying DB</h1><p>${err.message}</p>`);
        } else {
          res.end(`<h1>Success! This is a multi container demonstration using docker compose</h1><p>The DB says the time is(following value will be captured from database): ${results[0].time}</p>`);
        }
      });
    });

    server.listen(3000, () => console.log('Web server is live on port 3000'));
  });
}, 10000); // 10000 milliseconds = 10 seconds
