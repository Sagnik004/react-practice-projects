import { useState } from 'react';

import Notes from './components/Notes';
import './App.css';
import NewNote from './components/NewNote';

const App = () => {
  const [notes, setNotes] = useState([
    { id: 1, text: 'This is a drag and drop note app' },
    { id: 2, text: 'We welcome you here' },
  ]);

  const handleAddNewNote = (content) => {
    const newNoteId = (notes[notes.length - 1]?.id || 0) + 1;
    setNotes((prev) => [...prev, { id: newNoteId, text: content }]);
  };

  return (
    <div>
      <NewNote onAddNewNote={handleAddNewNote} />
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
};

export default App;
