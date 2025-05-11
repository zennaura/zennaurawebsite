import React from 'react'
import './ProductIcon.css'
import icon1 from '../../../assests/producticon1.png'
import icon2 from '../../../assests/producticon2.png'
import icon3 from '../../../assests/producticon3.png'
import icon4 from '../../../assests/producticon4.png'
import icon5 from '../../../assests/producticon5.png'
import icon6 from '../../../assests/producticon6.png'

const ProductIcon = () => {
  return (
    <div className='ProductIcon-container'>
      <div className="ProductIcon-Icons">
        <img src={icon6} alt="icon1" />
      </div>
      <div className="ProductIcon-Icons">
        <img src={icon5} alt="icon2" />

      </div>
      <div className="ProductIcon-Icons">
        <img src={icon4} alt="icon3" />

      </div>
      <div className="ProductIcon-Icons">

        <img src={icon3} alt="icon4" />
      </div>
      <div className="ProductIcon-Icons">

        <img src={icon2} alt="icon5" />
      </div>
      <div className="ProductIcon-Icons">
        <img src={icon1} alt="icon6" />

      </div>
    </div>
  )
}

export default ProductIcon
