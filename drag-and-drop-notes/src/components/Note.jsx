import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Note = forwardRef(({ content, initialPosition, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className='note'
      style={{
        top: `${initialPosition?.y}px`,
        left: `${initialPosition?.x}px`,
      }}
      {...props}
    >
      📌 {content}
    </div>
  );
});

Note.displayName = 'Note';

Note.propTypes = {
  content: PropTypes.string,
  initialPosition: PropTypes.object,
};

export default Note;
