const { Command } = require('commander');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      console.log(contacts);
      break;

    case 'get':
      const contact = await getContactById(id);
      console.log(contact);
      break;

    case 'remove':
      const deleteContact = await removeContact(id);
      console.log(deleteContact);
      break;

    case 'add':
      const newContact = await addContact({
        name,
        email,
        phone,
      });
      console.log(newContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// ===================================================
// invokeAction({ action: "list" });

// const id = '10';
// invokeAction({ action: "get", id });

// const id = 'c9f97c04-4202-4456-96b3-6bd8a02edaf6';
// invokeAction({ action: 'remove', id });

// const data = {
//   name: 'Steven Strange',
//   email: 'doctorsrange@mail.com',
//   phone: '(885) 541-5463',
// };
// invokeAction({ action: 'add', ...data });
