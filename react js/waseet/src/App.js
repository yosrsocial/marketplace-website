import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { ProfileBar } from './Components/ProfileBar/ProfileBar.jsx';
import SellItem from './Components/Sell/sell.jsx'
import {Home} from './Pages/Home';
import {Profile} from './Pages/Profile';
import {Product} from './Pages/Product';
import {Cart} from './Pages/Cart';
import {Login} from './Pages/Login';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { CheckoutPage } from './Pages/CheckoutPage';

function App() {
  return (
    <div>
      <BrowserRouter>
      <div className='content'>
      <NavBar/>

      </div>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/AddListing' element={<SellItem/>}/>
      <Route path='/Product' element={<Product/>}/>
      <Route path="/product/:id" element={<Product />} />
      <Route path= '/Favorites' element={<Cart/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Checkout' element={<CheckoutPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
