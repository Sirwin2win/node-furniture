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


try {
    mongoose.connect('mongodb+srv://sirwin2win:Chiemerie1@cluster0.etqft.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    // mongoose.connect('mongodb://127.0.0.1:27017/furniture');
    console.log('Connected to DB');

} catch (error) {
    handleError(error);
}


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