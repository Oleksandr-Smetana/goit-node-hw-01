const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// shows a list of contacts in the console
async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
  }
}

// shows a contact by id in the console
async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const result = data.find(contact => contact.id === contactId);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

// remove a contact by id and show it in the console
async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const idx = data.findIndex(contact => contact.id === contactId);
    if (idx === -1) {
      return null;
    }
    const newList = data.filter((_, index) => index !== idx);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newList, null, 2),
    );
    return data[idx];
  } catch (error) {
    console.log(error);
  }
}

// add a contact to the list and show it in the console
async function addContact({ name, email, phone }) {
  try {
    const data = await listContacts();
    const newContact = { id: v4(), name, email, phone };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
