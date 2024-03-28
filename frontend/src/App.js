
import './App.css';
import {Routes, Router, Route} from'react-router-dom';

import TasksList from './components/TaskList';
import TaskFormCreate from './components/TaskFormCreate';

function App() {
  return (
    <div className="App">
     {/* <Router> */}
      <Routes>
      <Route path='/' element={<TasksList/>} />
      <Route path='/create' element={<TaskFormCreate/>} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
