import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";
import Home from './Routes/Home';
import Movies from './Routes/Movies';
import MovieDetails from './Routes/MovieDetails';
import SeatLayout from './Routes/SeatLayout';
import MyBookings from './Routes/MyBookings';
import Favorite from './Routes/Favorite';
import Footer from './components/Footer';
import {Toaster} from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import Layout from './Routes/admin/Layout';
import Dashboard from './Routes/admin/Dashboard';
import AddShows from './Routes/admin/AddShows';
import ListShows from './Routes/admin/ListShows';
import ListBookings from './Routes/admin/ListBookings';
import { useAppContext } from './context/AppContext';
import { SignIn } from '@clerk/clerk-react';
import Loading from './components/Loading';

function App() {

    const isAdminRoute = useLocation().pathname.startsWith('/admin')

    const {user} = useAppContext()
  
  return (
    <>
    <Toaster />
    {!isAdminRoute && <Navbar />}
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Movies' element={<Movies/>} />
      <Route path='/Movies/:id' element={<MovieDetails/>} />
      <Route path='/Movies/:id/:date' element={<SeatLayout/>} />
      <Route path='/My-bookings' element={<MyBookings/>} />
      <Route path='/loading/:nextUrl' element={<Loading/>} />
      <Route path='/favorite' element={<Favorite/>} />

      <Route path='/admin/*' element={user ? <Layout/> : (
        <div className='min-h-screen flex justify-center items-center'>
          <SignIn fallbackRedirectUrl={'/admin'} /> 
        </div>
      ) } >
        <Route index element={<Dashboard/>}></Route>
        <Route path='add-shows' element={<AddShows/>} />
        <Route path='list-shows' element={<ListShows/>} />
        <Route path='list-bookings' element={<ListBookings/>} />
        </Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
