import { useState } from 'react';
import PropTypes from 'prop-types';

const Folder = ({ explorerData, onAddNewFileOrFolder }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const toggleExpand = () => {
    setExpand((prev) => !prev);
  };

  const handleNewFolderOrFileClick = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleAddNewFileOrFolder = (e) => {
    // Enter key pressed, and valid folder/file name was entered...
    if (e.keyCode === 13 && e.target.value.trim()) {
      onAddNewFileOrFolder(
        explorerData.id,
        e.target.value.trim(),
        showInput.isFolder
      );
      setShowInput({
        visible: false,
        isFolder: null,
      });
    }
  };

  if (explorerData.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={toggleExpand}>
          <span>📁 {explorerData.name}</span>

          <div>
            <button
              className="btn"
              onClick={(e) => handleNewFolderOrFileClick(e, true)}
            >
              Folder +
            </button>
            <button
              className="btn"
              style={{ marginLeft: '5px' }}
              onClick={(e) => handleNewFolderOrFileClick(e, false)}
            >
              File +
            </button>
          </div>
        </div>

        <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? '📁' : '📄'}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={handleAddNewFileOrFolder}
              />
            </div>
          )}

          {explorerData.items.map((item) => (
            <Folder
              key={item.id}
              explorerData={item}
              onAddNewFileOrFolder={onAddNewFileOrFolder}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorerData.name}</span>;
  }
};

Folder.propTypes = {
  explorerData: PropTypes.object,
  onAddNewFileOrFolder: PropTypes.func,
};

export default Folder;
