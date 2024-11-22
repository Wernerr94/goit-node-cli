import path from 'path';
import fs from 'fs/promises';
import Contact from './Contact.js';


const contactsPath =  path.join(process.cwd(), 'db/contacts.json');

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts.toString())
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId) ?? null
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactToRemove = await getContactById(contactId);
  const filtered = contacts.filter(contact => contact.id !== contactId);
  if (!contactToRemove) {
    return null;
  }else {
    await fs.writeFile(contactsPath, JSON.stringify(filtered, null, 2));
    return contactToRemove
  }
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contact = new Contact(name, email, phone);
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contact;
}

const contactsService = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}

export default contactsService;