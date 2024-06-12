import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import InfoBlockDashboard from './InfoBlockDashboard/InfoBlockDashboard'

import { FaUser } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsShop } from "react-icons/bs";
import axios from 'axios';




function HomeDash() {
  const [ProductNum,setProductNum] = useState(0);

  useEffect(()=>{
    axios.get('http://localhost:3003/Products')
    .then(req=>setProductNum(req.data.length))
  },[ProductNum])

 
  return (
    <>
      <div className='flex topHome' style={{"--JustifyContent":"space-between","--Align":"center"}}>
        <div className='IntroMess'>
          <h1>Welcome Back, <span className='AdminName' style={{"color":"#c48c23f7"}}>NAN MO</span></h1>
          <p>View the statistics about your business. Also manage and add products.</p>
        </div>
        <div className='flex' style={{"--gaps":"20px","flexWrap":'wrap',"--JustifyContent":"flex-end"}}>
          <Link to='/Products' className='view flex' style={{"--JustifyContent":'center',"--Align":"center","--gaps":"2px","--Color":"#b3afaf","--bg":"#b3afaf30","--dark":"#8a8484"}}><span>view product</span><span><BsBoxArrowUpRight/></span></Link>
          <Link to='' className='view flex' style={{"--JustifyContent":'center',"--Align":"center","--gaps":"2px","--Color":"#eab656","--bg":"#eab65621","--dark":"#e29c1c"}}><span>view shop</span><span><BsShop/></span></Link>
        </div>
      </div>
      <div className='flex Summary' style={{"--JustifyContent":"center","--Align":"center","flexWrap":"wrap","--gaps":"30px"}}>
        <InfoBlockDashboard icon={<FaUser className='Icon'/>} title='Users' value='37'/>
        <InfoBlockDashboard icon={<FaShoppingBasket className='Icon'/>} title='Products' value={ProductNum}/>
        <InfoBlockDashboard icon={<FaList className='Icon'/>} title='Category' value='37'/>
        <InfoBlockDashboard icon={<FaCartShopping className='Icon'/>} title='Orders' value='37'/>
      </div>
    </>
    
  )
}

export default HomeDash
