const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let customers = [];

app.post('/api/customers', (req, res) => {
  const newCustomer = req.body;

  const existingCustomer = customers.find(c => c.id === newCustomer.id);
  if (existingCustomer) {
    return res.status(409).json({ message: 'Customer ID already exists' });
  }

  customers.push(newCustomer);
  res.json(newCustomer);
});

app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.get('/api/customers/:id', (req, res) => {
  const customerId = req.params.id;
  const customer = customers.find(c => c.id === customerId);
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }
  res.json(customer);
});

app.put('/api/customers/:id', (req, res) => {
  const customerId = req.params.id;
  const updatedCustomer = req.body;
  const index = customers.findIndex(c => c.id === customerId);
  if (index === -1) {
    return res.status(404).json({ message: 'Customer not found' });
  }
  customers[index] = { ...customers[index], ...updatedCustomer };
  res.json(customers[index]);
});

app.delete('/api/customers/:id', (req, res) => {
  const customerId = req.params.id;
  const index = customers.findIndex(c => c.id === customerId);
  if (index === -1) {
    return res.status(404).json({ message: 'Customer not found' });
  }
  const deletedCustomer = customers.splice(index, 1);
  res.json(deletedCustomer[0]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});