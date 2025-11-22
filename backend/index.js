// index.js
const express = require('express');
const bodyParser = require('body-parser');
const MaxHeap = require('./heap');

const app = express();
const port = 4000;
app.use(bodyParser.json());
app.use((req, res, next) => { res.setHeader('Access-Control-Allow-Origin','*'); res.setHeader('Access-Control-Allow-Headers','*'); next(); });

const heap = new MaxHeap();
let idCounter = 1;

// sample pre-seeded patients (optional)
heap.push({ id: idCounter++, name: 'Ramesh', severity: 10, arrivalTime: Date.now() - 10000 });
heap.push({ id: idCounter++, name: 'Tara', severity: 6, arrivalTime: Date.now() - 8000 });

// Add patient
app.post('/patients', (req, res) => {
  const { name, severity } = req.body;
  if (!name || typeof severity !== 'number') return res.status(400).send({ error: 'invalid' });
  const patient = { id: idCounter++, name, severity, arrivalTime: Date.now() };
  heap.push(patient);
  res.send({ ok: true, patient });
});

// Treat next patient (pop)
app.post('/treat', (req, res) => {
  const patient = heap.pop();
  if (!patient) return res.status(404).send({ ok: false, message: 'No patients' });
  res.send({ ok: true, patient });
});

// Get queue (sorted for display)
app.get('/queue', (req, res) => {
  const sorted = heap.toSortedArray();
  res.send({ queue: sorted });
});

app.listen(port, () => console.log(`Triage backend on http://localhost:${port}`));
