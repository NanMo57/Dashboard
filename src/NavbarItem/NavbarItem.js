import React from 'react'
import { NavLink } from 'react-router-dom'

function NavbarItem({ListVal,path}) {
  return (
    <li><NavLink to={path}>{ListVal}</NavLink></li>
  )
}

export default NavbarItem
