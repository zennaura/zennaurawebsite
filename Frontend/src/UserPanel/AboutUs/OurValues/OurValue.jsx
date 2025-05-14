import React from 'react'
import './OurValue.css'
const OurValue = () => {
  return (
    <div className="OurValue-wrapper">
      <div className="OurValue-container">
        <h1 className='OurValue-title'>Our Values</h1>
        
        <div className="OurValue-row">
          <div className="OurValue-text OurValue-left">
            <h2 className="OurValue-value-title">Purity You Can See & Trust</h2>
            <p className="OurValue-value-detail">
              We Don't Just Claim Purity—We Prove It. From Our Ingredient Sourcing To Our Advertisements 
              And Product Transparency, Every Step Reflects The Authenticity We Promise.
            </p>
          </div>
          <div className="OurValue-divider"></div>
        </div>


        <div className="OurValue-row OurValue-right">
          <div className="OurValue-divider"></div>
          <div className="OurValue-text OurValue-right">
            <h2 className="OurValue-value-title">Evolving Through You</h2>
            <p className="OurValue-value-detail">
            Your Feedback Shapes Us. We Are Always Listening, Learning, And Improving To Bring You 
            Skincare And Wellness That Truly Aligns With Your Needs.
            </p>
          </div>
        </div>

        
        <div className="OurValue-row OurValue-row-last">
          <div className="OurValue-text OurValue-left">
            <h2 className="OurValue-value-title">Healing Beyond Beauty</h2>
            <p className="OurValue-value-detail">
            Zenn Aura isn’t just about skincare—it’s about energy, well-being, and mindful rituals. Our products are infused with nature’s wisdom, designed to balance your aura and elevate your daily self-care.
            </p>
          </div>
          <div className="OurValue-divider"></div>
        </div>
      </div>
    </div>
  )
}

export default OurValue