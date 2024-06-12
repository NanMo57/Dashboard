import React from 'react'
import RadioButton from './InputForm/RadioButton'

import { GoUpload } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";

function FormProduct({
    submit,TitleChange,PriceChange,CategoryChange,FileCahnge,RemoveImg,SizeChange,ColorChange,
    TitleBlur,sizeBlur,colorBlur,
    ErrorTitle,ErrorPrice,ErrorCategory,ErrorGallary,ErrorSize,ErrorColor,
    Title,colors,sizes,Price,ImageReder,Category,
    ImgRef,ColorRef,SizeRef,PriceRef,TitleRef
}) {
  return (
    <div>
        <form onSubmit={(e)=>submit(e)}>
            <div>
                <div>
                    <label className='label'>Title</label>
                    <input type='text' placeholder='Title of product' value={Title} onChange={(e)=>TitleChange(e)} ref={TitleRef}/>
                </div>
                <div className='ErrorMessage'>
                    <p>{ErrorTitle}</p>
                </div>
            </div>
            <div>
                <div>
                    <label className='label'>Price</label>
                    <div className='flex' style={{"--Align":"center","--gaps":"2px"}}>
                        <input type='text' placeholder='Price of product' value={Price} onChange={(e)=>PriceChange(e)} ref={PriceRef}/>
                        <span>JOD</span>
                    </div>
                </div>
                <div className='ErrorMessage'>
                    <p>{ErrorPrice}</p>
                </div>
            </div>
            <div>
                <label className='label' style={{"margin":"30px 0 15px"}}>Category</label>
                <div className='flex' style={{"--gaps":"20px","marginTop":"15px"}}>
                    <RadioButton name="category" val='Women' fun={(e)=>CategoryChange(e)} check={Category}/>
                    <RadioButton name="category" val='Men' fun={(e)=>CategoryChange(e)} check={Category}/>
                    <RadioButton name="category" val='Kids' fun={(e)=>CategoryChange(e)} check={Category}/>
                </div>
                <div className='ErrorMessage'>
                    <p>{ErrorCategory}</p>
                </div>
            </div>
            <div>
                <div className='flex uploadImg' style={{"--gaps":"10px","--Align":"center"}}>
                    <label className='label'>Images</label>
                    <input type='file' style={{display:'none'}} multiple ref={ImgRef} onChange={(e)=>FileCahnge(e)}/>
                    <div onClick={()=>ImgRef.current.click()} className='flex upload' style={{"--JustifyContent":"center","--Align":"center","--gaps":"2px"}}><GoUpload/><span>Upload</span></div>
                </div>
                <div className='ErrorMessage'>
                    <p>{ErrorGallary}</p>
                </div>
                <div className='gallary flex' style={{"--gaps":"20px"}}>
                    {ImageReder && ImageReder.map((img,ind)=>(
                       <div key={ind}>
                            <img src={img} alt='product'/>
                            <span onClick={(e)=>RemoveImg(ind)}><MdDeleteOutline/></span>
                      </div>
                    ))}
                </div>
            </div>
            <div className='flex separate' style={{"--gaps":"20px"}}>
                <div>
                    <div>
                        <label className='label'>Sizes</label>
                        <input type='text' value={sizes} placeholder='small,meduim,....' onChange={(e)=>SizeChange(e)} onBlur={(e)=>sizeBlur(e)} ref={SizeRef}/>
                        <p>Separate between each size by (,)</p>
                    </div>
                    <div className='ErrorMessage'>
                        <p>{ErrorSize}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <label className='label'>Colors</label>
                        <input type='text' value={colors} placeholder='red,green,....' onChange={(e)=>ColorChange(e)} onBlur={(e)=>colorBlur(e)} ref={ColorRef}/>
                        <p>Separate between each colors by (,)</p>
                    </div>
                    <div className='ErrorMessage'>
                        <p>{ErrorColor}</p>
                    </div>
                </div>
            </div>
            <input type='submit' value='Save Product'/>
        </form>
      </div>
  )
}

export default FormProduct
