const express = require("express");
const app = express();

app.use(express.json());


let contacts = [
  { name: "John Doe", email: "john.doe@example.com" },
  { name: "Jane Smith", email: "jane.smith@example.com" }
];

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

app.post("/api/contacts", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }

  const newContact = { name, email };
  contacts.push(newContact);

  res.status(201).json({ message: "Contact added", contact: newContact });
});

app.put("/api/contacts/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= contacts.length) {
    return res.status(404).json({ error: "Contact not found" });
  }

  const { name, email } = req.body;
  contacts[index] = {
    ...contacts[index],
    ...(name && { name }),
    ...(email && { email })
  };

  res.json({ message: "Contact updated", contact: contacts[index] });
});

app.delete("/api/contacts/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (isNaN(index) || index < 0 || index >= contacts.length) {
    return res.status(404).json({ error: "Contact not found" });
  }

  const deleted = contacts.splice(index, 1)[0];
  res.json({ message: "Contact deleted", deleted });
});

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
