const express = require('express');
const sqlite = require('sqlite3');

const db = new sqlite.Database('./words.sqlite')

const app = express();

app.use(express.json());

app.post('/api/type', (req, res) => {
  console.log(req.body);
  const sql = `select * from words order by random() limit ${req.body.count};`;
  db.all(sql, [], (err, rows) => {
    console.table(rows);
    res.json({ data: rows });
  });
});

app.listen(3001, () => {
  console.log('Server is running');
});
