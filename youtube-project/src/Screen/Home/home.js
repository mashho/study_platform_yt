import React,{useState} from 'react';
import './home.css';

import HomePage from '../../Component/HomePage/homePage';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';

const Home = ({sideNavbar}) => {
    
  return (
    <div className='home'>
        <SideNavbar  sideNavbar={sideNavbar} />
        
        <HomePage sideNavbar={sideNavbar} />
    </div>
  )
}

export default Home