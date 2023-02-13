const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Body text',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body)
  }
})

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Title of note to remove',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.removeNote(argv.title);
  }
})

// create list command
yargs.command({
  command: 'list',
  describe: 'Lists all notes',
  handler:  () => {
    notes.listNotes();
  }
})

// create read command
yargs.command({
  command: 'read',
  describe: 'reads a notes',
  builder: {
    title: {
      describe: "Title of note to read",
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  }
})

yargs.parse()