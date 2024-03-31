import './App.css';
import SelectableGrid from './components/SelectableGrid';

const App = () => {
  return (
    <main className='main-section'>
      <h1>Selectable Grid</h1>
      <SelectableGrid rows={10} cols={10} />
    </main>
  );
};

export default App;
