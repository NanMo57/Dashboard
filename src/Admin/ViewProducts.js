import React, { useEffect , useState} from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { GiPartyPopper } from "react-icons/gi";
import { FiPlusCircle } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";


import axios from 'axios';



function ViewProducts() {

  const [Products,setProducts] = useState()
  const [ProductDeleteName,setProductDeleteName] = useState()
  const [ProductDeleteId,setProductDeleteId] = useState()

    const Navigation = useNavigate()

  
  axios.get('http://localhost:3003/Products')
  .then(products=>products.data)
  .then(data=>setProducts(data))
  
  const handleEditeProduct = (title,id)=>{
    Navigation(`edit/${title}/${id}`)
  }
  
  const handleToRemoveProdect = (id,Name) =>{ 
      setProductDeleteName(Name)
      setProductDeleteId(id)
      let box = document.querySelector('.DeleteBlockQuestion')
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const boxHeight = box.offsetHeight;
      const boxTop = scrollTop + (windowHeight - boxHeight) / 2;
      box.style.top = `${boxTop}px`;
      box.style.display='block';
  }
  const handleOnDelete = (id)=>{
    axios.delete(`http://localhost:3003/Products/${ProductDeleteId}`)
    .then(products=>products.data).then(
      document.querySelector('.DeleteBlockQuestion').style.display='none'
    )
  }
  const handleOnCancel = ()=>{
    document.querySelector('.DeleteBlockQuestion').style.display='none'
  }
  return (
    <>
      <div className='flex topView' style={{"--JustifyContent":"space-between","--Align":"center","flexWrap":"wrap","--gaps":"20px"}}>
        <div className='IntroMess'>
          <h1>All Products</h1>
          <p>Let's create a new product!<GiPartyPopper/></p>
        </div>
        <Link to='/Products/new' className='view flex' style={{"--JustifyContent":'center',"--Align":"center","--gaps":"2px","--Color":"#2bad98","--bg":"#e0f3f3","--dark":"#119781"}}><span><FiPlusCircle style={{"marginTop":"4px"}}/></span><span>Add Product</span></Link>
      </div>
      <div className='ViewProduct'>
        {Products && Products.map((product,index)=>(
            <div key={index} className='flex ProductBlock' style={{"--JustifyContent":"space-between","--Align":"center"}} >
              <div className='flex' style={{"--JustifyContent":"space-between","--Align":"center","--gaps":"40px"}}>
                <div><h4>#{index+1}</h4></div>
                <div className='flex' style={{"--JustifyContent":"flex-start","--Align":"center","--gaps":"10px","minWidth":"300px"}}>
                  <img src={product.Products_images[0]} alt='product' className='Product_img'/>
                  <h4 className='TitlePro'>{product.Products_Title}</h4>
                </div>
              </div>
              <div className='flex' style={{"--JustifyContent":"space-between","--Align":"center","--gaps":"40px"}}>
                  <div><h4>{product.Products_Category}</h4></div>
                  <div className='flex' style={{"--Align":"center","--gaps":"10px"}}><h4>{product.Products_Price}</h4><span>JOD</span></div>
                  <div className='ControlProduct flex' style={{"--gaps":"20px"}}>
                    <button onClick={(e)=>handleEditeProduct(product.Products_Title,product.id)}><span className='deviceMedia'>Edit</span><span className='tabletMedia'><FaEdit /></span></button>
                    <button onClick={(e)=>handleToRemoveProdect(product.id,product.Products_Title)}><span className='deviceMedia'>Delete</span><span className='tabletMedia'><MdDelete /></span></button>
                  </div>
              </div>
            </div>
        ))} 
      </div>
      <div className='DeleteBlockQuestion'>
        <div>
          <div className='Delete'><MdDelete /></div>
          <h4>Delete {ProductDeleteName}</h4>
          <p>Are you sure you want to delete this product? <br/>
          This action cannot be undone.</p>
          <div>
              <button style={{"--background":"#e2dcdc","--color":"black"}} onClick={(e)=>handleOnCancel()}>Cancel</button>
              <button style={{"--background":"#f85959","--color":"white"}} onClick={(e)=>handleOnDelete()}>Delete</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewProducts
