import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Items from './components/itemPage';
import AuthNav from './components/authNavBar';
import BoughtItems from './components/store';
import NotFound from './components/notFound';
import NavBar from './components/navbar';
import { authcontext } from './components/context';
import { useContext } from 'react';
import SingleItem  from './components/item';
import AddItem from './components/addItem';
import SoldItems from './components/soldItem';
import EditItems from './components/editItems';
import Users from './components/users';

function App() {
  const { isAuthenticated } = useContext(authcontext);
  const { admin } = useContext(authcontext);

  return (
    <div className='body'>
      <BrowserRouter>
        {isAuthenticated ? <AuthNav /> : <NavBar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/items" element={isAuthenticated && <Items />} Component={isAuthenticated && Items} />
          <Route exact path="/addItem" element={ admin && <AddItem />} Component={ admin && AddItem} />
          <Route exact path="/editItems" element={ admin && <EditItems />} Component={ admin && EditItems} />
          <Route exact path="/soldItems" element={ admin &&  <SoldItems />} Component={ admin && SoldItems} />
          <Route exact path="/users" element={ admin &&  <Users />} Component={ admin && Users} />
          <Route exact path="/store" element={isAuthenticated && <BoughtItems />} />
          <Route exact path="/item/:id" element={ isAuthenticated &&  <SingleItem />} Component={isAuthenticated &&  SingleItem} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
