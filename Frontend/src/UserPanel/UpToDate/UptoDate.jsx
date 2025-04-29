import React from 'react';
import './UptoDate.css';

const UptoDate = () => {
  return (
    <div className='UptoDate-container'>
      <h1 className="heading-uptodate">Stay Up To Date</h1>
      <p className="para-uptodate">
        Enter your email address to receive updates on new product previews, ad promotions, and special offers.
      </p>
      <div className="input-uptodate-container">
        <input type="email" className="input-uptodate" placeholder="Your email address..." />
        <button className="btn-uptodate">Subscribe</button>
      </div>
      <div className="upto-date-premission">
        <input type="checkbox" name="uptopers" id="permission-checkbox" />
        <label htmlFor="permission-checkbox" className="upto-date-permission-para">
          By proceeding ahead, I agree and accept Zenn Aura privacy policy and terms.
        </label>
      </div>
    </div>
  );
};

export default UptoDate;