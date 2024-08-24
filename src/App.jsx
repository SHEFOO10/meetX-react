// import { Dashboard } from './Dashboard';
import { DemoCreateAccount } from './components/create-account';

import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import ProfileForm from './ProfileForm';


const Home = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center transition-all">
      <ProfileForm />
    </div>
  )
}

function App() {

  return (
    <Routes>
    <Route path="/" element={<Home />}>
    <Route path="*" element={<Home />} />
    </Route>
  </Routes>
  )
}

export default App
