const express = require('express');
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendick',
    number: '39-23-6423122',
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello!</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people.</p>
    <p>${new Date().toUTCString()}</p>`
  );
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((e) => e.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((note) => note.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const newPerson = req.body;

  if (!newPerson.name || !newPerson.number) {
    const error = !newPerson.name ? 'Name is missing!' : 'Number is missing!';
    return res.status(400).json({
      error,
    });
  }

  if (persons.find((e) => e.name === newPerson.name)) {
    return res.status(400).json({
      error: 'name must be unique',
    });
  }

  newPerson.id = Math.trunc(Math.random() * (100000000 - 5) + 5);
  persons.push(newPerson);
  res.json(newPerson);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});