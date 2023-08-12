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

app.get("/employees/:active", async (req, res) => {
  const results = await dbClient
    .query(`SELECT * FROM employees
    WHERE active = '${req.params.active}' `)
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

//inactive
app.post('/employees/status', async (req, res) => {
  console.log(req.body);
  const results = await dbClient.query(`UPDATE public.employees 
    SET active = '${req.body.userStatus}'
    WHERE employees.id = ${req.body.employee.id}`);
  // const result2 = await dbClient
  // .query(`SELECT * FROM public.employees
  // WHERE active = true`)

  // find out what is being returned from this? --> console.log(results.rows);
  // if it sends back the updated rows than you have do the second query to `SELECT * from 'public.employee
  console.log(results.rows)

  // res.send(JSON.stringify(result.rows));
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


/*app.post('/employees/:id', async (req, res) => {
  const results = await dbClient
    .query(`INSERT INTO employees (status) VALUES ('${req.body.userStatus}')
    WHERE employees.id = ${req.params.id}`)
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed") ;
    });

    res.send(JSON.stringify(results));     
});*/