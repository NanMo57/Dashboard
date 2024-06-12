import React, { useRef, useState } from 'react'
import { Link, Routes,Route } from 'react-router-dom'

import Logo from '../images/Logo.png'
import NavbarItem from '../NavbarItem/NavbarItem'

import HomeDash from './HomeDash'
import {DashboardStyle} from './Styling/Module.Dashbord.css'
import ViewProducts from './ViewProducts'
import AddProducts from './AddProducts'
import EditProducts from './EditProducts'
import { TiThMenu } from "react-icons/ti";



function Dashboard() {
  const MenuRef = useRef()
  const [view,setView] = useState(false)
  const HandleToViewMenu = (e)=>{
    setView(!view)
    view === true ? MenuRef.current.classList.remove('hidden') : MenuRef.current.classList.add('hidden')
  }

  return (
    <div className='body_Dashboard flex' style={{"--JustifyContent":"flex-start"}}>
      <header className='flex' style={{"--DirectionFlex":"column"}} >
        <div className='Logo flex' style={{"--DirectionFlex":"column","--Align":"center"}}>
            <img src={Logo} alt='Logo'/>
            <h3 className='flex' style={{"--DirectionFlex":"row"}}><hr/>Shopping<hr/></h3>
        </div>
        <nav>
            <ul className='flex' style={{"--DirectionFlex":"column","--JustifyContent":"space-between","--Align":"center"}}>
              <div>
                <div className='menuDiv hidden' ref={MenuRef}>
                      <NavbarItem ListVal='Dashboard' path='/'/>
                      <NavbarItem ListVal='Products' path='/Products'/>
                      <NavbarItem ListVal='Orders' path='/Orders'/>
                      <NavbarItem ListVal='Users' path='/Users'/>
                </div>
                <TiThMenu className='menu' onClick={(e)=>HandleToViewMenu(e)}/>
              </div>
            <Link to='' className='AdminAccount flex' style={{"--Align":'center','--JustifyContent':'center'}}>NM</Link>
            </ul>
        </nav>
      </header>
      <section>
      <Routes>
        <Route path='/' element={<HomeDash/>}/>
        <Route path='Products' element={<ViewProducts/>}/>
        <Route path='Products/new' element={<AddProducts/>}/>
        <Route path='Products/edit/:name/:id' element={<EditProducts/>}/>
      </Routes>
      </section>
    </div>
  )
}

export default Dashboard
