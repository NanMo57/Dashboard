import React from 'react'


function InfoBlockDashboard({icon,title,value}) {
  return (
    <div className='flex Block' style={{"--Align":"center","--gaps":"10px","--JustifyContent":'center'}}>
      {icon}
      <div className='flex' style={{"--DirectionFlex":"column"}}>
        <h5>{title}</h5>
        <h1>{value}</h1>
      </div>
    </div>
  )
}

export default InfoBlockDashboard
