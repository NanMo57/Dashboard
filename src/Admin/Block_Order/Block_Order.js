import React from 'react'
import ProductOrder from './productOrder'

function Block_Order({OrderNum,OrderID,By,Email,Country,Address,City,name,quan,price}) {
  return (
    <div>
        <h2>Order #{OrderNum}</h2>
        <div>
            <div>
                <p><span><b>ID :</b></span><span>{OrderID}</span></p>
                <p><span><b>By :</b></span><span>{By}</span></p>
                <p><span><b>Email :</b></span><span>{Email}</span></p>
            </div>
            <div>
                <p><span><b>Country :</b></span><span>{Country}}</span></p>
                <p><span><b>Adress :</b></span><span>{Address}</span></p>
                <p><span><b>City :</b></span><span>{City}</span></p>
            </div>
        </div>
        <div>
            <ul>
                <li><b>Products</b></li>
                <li><b>Quantity</b></li>
                <li><b>Price</b></li>
            </ul>
            <div>
                <ProductOrder />
            </div>
        </div>
        <div>
            <p>Total:<b>{sumquan*sumprice}</b>JOD</p>
            <div>
                <button>Start Prepair</button>
                <button></button>
            </div>
        </div>
    </div>
  )
}

export default Block_Order
