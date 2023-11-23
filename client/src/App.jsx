import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import Navbar from './components/common/Navbar.jsx';
import PrivateRoute from './components/ui/PrivateRoute.jsx';
import Project from './pages/Project.jsx';
import CreateList from './pages/CreateList.jsx';
import UpdateList from './pages/updateList.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path='/about' element={<About />}/>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/create-list' element={<CreateList />}/>  
          <Route path='/project' element={<Project />}/>
          <Route path='/update-list/:listId' element={<UpdateList />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App