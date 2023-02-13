const chalk = require('chalk');
const fs = require('fs');

const getNotes = () => `Your notes...`

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })

    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
}

const removeNote = (title) => {
  const notes = loadNotes();
  const newNotes = notes.filter((note) => note.title !== title);

  if (newNotes.length !== notes.length) {
    console.log(chalk.bgGreenBright('Note removed!'))
    saveNotes(newNotes);
  } else console.log(chalk.bgRedBright('No note found!'))
  
}

const listNotes = () => {
  console.log(
    chalk.bgYellowBright.blueBright.italic.bold('Y') +
    chalk.bgBlueBright.yellowBright.italic('O') +
    chalk.bgYellowBright.blueBright.italic.bold('U') +
    chalk.bgBlueBright.yellowBright.italic('R') +
    chalk.bgYellowBright.blueBright.italic.bold(' ') +
    chalk.bgBlueBright.yellowBright.italic('N') +
    chalk.bgYellowBright.blueBright.italic.bold('O') +
    chalk.bgBlueBright.yellowBright.italic('T') +
    chalk.bgYellowBright.blueBright.italic.bold('E') +
    chalk.bgBlueBright.yellowBright.italic('S') +
    chalk.bgYellowBright.blueBright.italic.bold(':'));
  
    const notes = loadNotes();
    notes.forEach((note) => {
      console.log(
        chalk.black.bgCyanBright.bold(` Title:`) +
        chalk.black.bgCyanBright.italic(note.title) +
        chalk.black.bgCyanBright.italic(' ')
      )
    })
}

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.bgBlackBright.bold.magentaBright(` ${note.title.toUpperCase()} `));
    console.log(chalk.italic.magenta(note.body));
  } else {
    console.log(chalk.redBright('ERROR - no note found with that title'));
  }
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    console.log(e);
    return [];
  }
}

const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', notesJSON);
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}