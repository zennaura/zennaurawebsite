import React from "react";
import ImageHead from "../../components/ImageHead/ImageHead";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYouPage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { orderData } = location.state;

  const keepshoping = () =>{
      navigate('/shop')
  }
  return (
    <>
      <ImageHead Title={"Order Is Placed!"} />
      <div className="min-h-screen flex items-center justify-center !p-6 bg-white font-sans">
        <div className="max-w-md w-full text-center !p-8 bg-white rounded-lg shadow-sm">
          <div className="!mb-8">
            <h1 className="text-sm font-normal text-gray-800 !mb-2">Order Placed...</h1>
          </div>

          <h2 className="!text-4xl font-bold !mb-6 text-[#4A001F]">THANK YOU!</h2>

          <p className="text-[#4A001F] !mb-8 leading-relaxed underline-offset-2">
            We are getting started on your order right away, <br />
            and you will receive an order confirmation email <br />
            shortly to divajhai812@gmail.com. In the <br />
            meantime, explore the latest releases and start <br />
            manifesting, just head over to Zenn Aura New <br />
            Launches.
          </p>

          <button className="bg-[#4A001F] text-white !px-8 !py-3 rounded-md font-medium !mb-6 hover:!bg-[#3b001a] transition-colors cursor-pointer" onClick={keepshoping}>
            Keep Shopping
          </button>

          <p className="text-sm !text-[#4A001F] underline cursor-pointer hover:text-[#3b001a]">
            Read about our return & Shipping policy.
          </p>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;
