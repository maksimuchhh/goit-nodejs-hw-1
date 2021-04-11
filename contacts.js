const fs = require("fs");
const path = require("path");

const contactsPath = path.join("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) return;
    console.table(JSON.parse(data.toString()));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) return;
    const contacts = JSON.parse(data.toString());
    console.log(
      contacts.find(({ id }) => {
        return id == contactId;
      })
    );
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) return;
    const contacts = JSON.parse(data.toString());
    const updatedData = JSON.stringify(
      contacts.filter(({ id }) => id != contactId)
    );
    fs.writeFile(contactsPath, updatedData, (err) => {
      if (err) return;
      console.log("Contact was deleted!");
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) return;
    const contacts = JSON.parse(data.toString());
    contacts.push({
      id: Date.now(),
      name,
      email,
      phone,
    });
    const updatedData = JSON.stringify(contacts);
    fs.writeFile(contactsPath, updatedData, (err) => {
      if (err) return;
      console.log("Contact was added!");
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
