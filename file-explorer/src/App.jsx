import { useState } from 'react';

import Folder from './components/Folder';
import explorer from './data/folderData';
import useTraverseTree from './hooks/useTraverseTree';
import './App.css';

const App = () => {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode } = useTraverseTree();

  const handleAddNewFileOrFolder = (folderId, fileOrFolderName, isFolder) => {
    console.log(folderId, fileOrFolderName, isFolder);
    const finalTree = insertNode(explorerData, folderId, fileOrFolderName, isFolder);
    console.log("finalTree: ", finalTree);
    setExplorerData(finalTree);
  };

  return (
    <div className="app">
      <Folder
        explorerData={explorerData}
        onAddNewFileOrFolder={handleAddNewFileOrFolder}
      />
    </div>
  );
};

export default App;

// https://youtu.be/20F_KzHPpvI?list=PLKhlp2qtUcSZiWKJTi5-5r6IRdHhxP9ZU&t=1192
