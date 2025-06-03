import Login from './com/Login'
import Register from './com/register_list'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='register_list' element={<Register />} />
      </Routes>

  );
}


export default App;