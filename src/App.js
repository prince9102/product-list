
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Accessories from './Components/Accessories';
import Tables from './Components/Table';
import Update from './Components/Update';
import Dashboard from './Components/Dashboard';
import UserTable from './Components/UserTable';

function App() {
  return (
    <div >
    <ToastContainer/>
     <BrowserRouter>
      <Header/>
     <Routes>
     <Route path = '/' element={<Register/>}/>
      <Route path ='/login' element={<Login/>}/>
      <Route path='/accessories' element={<Accessories/>}/>
      <Route path='/table' element={<Tables/>}/>
      <Route path='/main' element={<Dashboard/>}/>
      <Route path='/update/:id' element={<Update/>}/>
      <Route path='/usertable' element={<UserTable/>}/>
     </Routes>

     </BrowserRouter>
    </div>
  );
}

export default App;
