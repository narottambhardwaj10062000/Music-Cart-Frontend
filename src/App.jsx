import './App.css'
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import LoginPage from "./Pages/LoginPage/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage/HomePage.jsx';
import SingleProductPage from './Pages/SingleProductPage/SingleProductPage.jsx';
import Cart from './Pages/CartPage/Cart.jsx';
import Checkout from './Pages/CheckoutPage/Checkout.jsx';
import OrderSuccessful from './Pages/OrderSuccessful/OrderSuccessful.jsx';
import Invoices from './Pages/Invoices/Invoices.jsx';
import InvoiceDetail from './Pages/InvoiceDetail/InvoiceDetail.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/singleProduct/:productId' element={<SingleProductPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout/:productId?' element={<Checkout />} />
        <Route path='/orderSuccessful' element={<OrderSuccessful />} />
        <Route path='/invoices' element={<Invoices />} />
        <Route path='/invoiceDetail/:orderId' element={<InvoiceDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
