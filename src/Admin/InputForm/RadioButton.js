import React from 'react'

function RadioButton({name,val,fun,check}) {
  return (
    <div className='flex' style={{"--Align":"center","--gaps":"2px"}}>
        <input type='radio' name={name} id={val} value={val} checked={check === val} onChange={(e)=>fun(e)}/>
        <label htmlFor={val}>{val}</label>
    </div>
  )
}

export default RadioButton
