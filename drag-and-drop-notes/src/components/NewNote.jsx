import { useRef } from 'react';
import PropTypes from 'prop-types';

const NewNote = ({ onAddNewNote }) => {
  const newNoteInputRef = useRef();

  const handleNewNoteSubmit = (e) => {
    e.preventDefault();
    const val = newNoteInputRef.current.value;
    onAddNewNote(val);
    newNoteInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleNewNoteSubmit}>
      <input type="text" ref={newNoteInputRef} />
      <button type="submit">Add Note</button>
    </form>
  );
};

NewNote.propTypes = {
  onAddNewNote: PropTypes.func,
};

export default NewNote;
