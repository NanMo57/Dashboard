import React from 'react'

function ProductOrder({Name,Quantity,Price}) {
  return (
    <div>
      <p>{Name}</p>
      <p>{Quantity}</p>
      <p>{Price}JOD</p>
    </div>
  )
}

export default ProductOrder
