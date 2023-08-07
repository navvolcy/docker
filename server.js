// @ts-check

const { Client } = require("pg");
const express = require("express");
const path = require('path');
const { error } = require("console");
const app = express();
const port = 8080;


const dbClient = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

app.use(express.static('client/build'));

app.use(express.json())

app.get("/employees", async (req, res) => {
  const results = await dbClient
    .query("SELECT * FROM employees")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

//delete
app.delete('/employees/:id', async (req, res) => {
  const results = await dbClient
    .query(`DELETE FROM employees WHERE employees.id = ${req.params.id}`)
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });

    res.send(JSON.stringify(results));     
});

//search 
app.post('/employees/:name', async (req, res) => {
  console.log('here',req.params.name);
 
  const results = await dbClient
    .query(`SELECT * FROM employees where employees.name= '${req.params.name}'`)
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.send(JSON.stringify(results));  
});
//save
app.post('/employees',async(req,res)=>{ 

   let query = `INSERT INTO public.employees (name, title, avatar) VALUES ('${req.body.userName}','${req.body.userTitle}','${req.body.userAvatar}')`;
  const result = await dbClient
  .query(query); 
  res.send(JSON.stringify(result)); 
});
dbClient.connect();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
