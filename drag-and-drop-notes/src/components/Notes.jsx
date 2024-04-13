import { createRef, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Note from './Note';

const Notes = ({ notes = [], setNotes = () => {} }) => {
  useEffect(() => {
    // Get saved notes from local storage
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    const updatedNotes = notes.map((note) => {
      // Check if the note is already saved in local storage
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote) {
        // Found in local storage! Return the saved details
        return { ...note, position: savedNote.position };
      } else {
        // New note, not saved in local storage. Generate a random position for the new note.
        const position = determineNewPosition();
        return { ...note, position };
      }
    });

    // Update state and save the updated notes in local storage
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }, [notes.length]);

  const noteRefs = useRef([]);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 250; // 200 is size of each note, extra 50 for buffer
    const maxY = window.innerHeight - 250;

    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  };

  const handleDragStart = (e, note) => {
    const {id} = note;

    const noteRef = noteRefs.current[id].current;
    const rect = noteRef.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const startPos = note.position;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;
      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      const finalRect = noteRef.getBoundingClientRect();
      const newPosition = {x: finalRect.left, y: finalRect.top};
      if (checkForOverlap(id)) { // is overlapping
        noteRef.style.left = `${startPos.x}px`;
        noteRef.style.top = `${startPos.y}px`;
      } else {
        updateNotePosition(id, newPosition);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const checkForOverlap = (id) => {
    const currentRef = noteRefs.current[id].current;
    const currentRect = currentRef.getBoundingClientRect();

    return notes.some((note) => {
      if (note.id === id) return false;

      const otherNoteRef = noteRefs.current[note.id].current;
      const otherNoteRect = otherNoteRef.getBoundingClientRect();
      const overlap = !(
        currentRect.right < otherNoteRect.left ||
        currentRect.left > otherNoteRect.right ||
        currentRect.bottom < otherNoteRect.top ||
        currentRect.top > otherNoteRect.bottom
      );

      return overlap;
    })
  }

  const updateNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {...note, position: newPosition};
      } else {
        return note;
      }
    });
    // Update state and save the updated notes in local storage
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div>
      {notes.map((note) => (
        <Note
          key={note.id}
          ref={
            noteRefs.current[note.id]
              ? noteRefs.current[note.id]
              : (noteRefs.current[note.id] = createRef())
          }
          initialPosition={note.position}
          content={note.text}
          onMouseDown={(e) => handleDragStart(e, note)}
        />
      ))}
    </div>
  );
};

Notes.propTypes = {
  notes: PropTypes.array,
  setNotes: PropTypes.func,
};

export default Notes;
