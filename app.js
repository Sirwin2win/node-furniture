const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const productRoute = require('./routes/productRoute.js');
var cors = require('cors')

const app = express()

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productRoute);


const connectDB = async () =>{
    try{
  const conn =await mongoose.connect(process.env.DB_URI)
   console.log(`MongoDB Connected: ${conn.connection.host}`);
  
  } catch (error){
    console.error(`Error: ${error.message}`)
    process.exit()
  }
  }
  connectDB()


const customers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "Mary Doe" },
    { id: 4, name: "Jude Doe" }
]

app.get('/', (req, res) => {
    res.send('Hello world!, Like say?')
})
app.get('/customers', (req, res, next) => {
    res.send(customers)
})
app.get('/customers/:id', (req, res, next) => {
    const customer = customers.find(c => c.id === parseInt(req.params.id))
    res.send(customer)
})

app.post('/customers', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send('Name is required & should be minimum of 3 characters')
    }
    const customer = {
        id: customers.length + 1,
        name: req.body.name
    };
    customers.push(customer);
    res.send(customer)
})

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})