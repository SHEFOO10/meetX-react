// import { Dashboard } from './Dashboard';

import { Routes, Route } from 'react-router-dom';

import { NotFound } from './NotFound';
import { Login } from './Login';
import { Signup } from './Signup';
import { Home } from './Home';
import { Meet } from './Meet';



function App() {

  return (
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path='/meet/:roomId' element={<Meet />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  )
}

export default App
