import './App.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Config } from './components/Config/Config';

function App() {
  return (
    <div className='app-container'>
      <Sidebar />
      <Config />
    </div>
  );
}

export default App;
