// import { Dashboard } from './Dashboard';

import { Routes, Route } from 'react-router-dom';

import { NotFound } from './NotFound';
import { Login } from './Login';
import { Signup } from './Signup';
import { Home } from './Home';
import { Meet } from './Meet';
import { AuthProvider } from './components/auth';
import { RequireAuth } from './components/RequireAuth';
import { Logout } from './components/Logout';


function App() {

  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/meet/:roomId' element={<RequireAuth><Meet /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}

export default App
