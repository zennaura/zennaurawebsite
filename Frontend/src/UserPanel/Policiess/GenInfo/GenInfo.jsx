import React from "react";
import './GenInfo.css'
const GenInfo = () =>{
    return(
        <>

        <div className="gen-info-container">
            <div className="gen-info-oddcontent">
                <h2 className="gen-info-title">
                    General Information
                </h2>
                <p className="gen-info-text"> 1.1. This website is operated by Zennaura. Throughout the site, the terms “we,” “us,” and “our” refer to Zennaura.</p>
                <p className="gen-info-text"> 1.2. By visiting or purchasing from us, you engage in our “Service” and agree to be bound by the following terms and conditions, including any additional terms or policies referenced herein.</p>
            </div>

            <div className="gen-info-evencontent">
            <h2 className="gen-info-title">
                    Eligibility to Use
                </h2>
                <p className="gen-info-text"> 2.1. You must be at least 18 years of age or accessing the site under the supervision of a parent or legal guardian.</p>
                <p className="gen-info-text"> 2.2. By placing an order, you warrant that you meet all eligibility criteria and that the information provided is accurate.</p>
            </div>

            <div className="gen-info-oddcontent">
            <h2 className="gen-info-title">
                    Pricing & Payment
                </h2>
                <p className="gen-info-text"> 3.1. All prices listed on our website are in rupee and are subject to change without notice.</p>
                <p className="gen-info-text"> 3.2. We reserve the right to cancel or refuse orders if the listed price or availability information is incorrect.</p>
                <p className="gen-info-text"> 3.3. Payments can be made via credit cards, UPI, wallets. We are not responsible for delays caused by payment gateway issues.</p>
            </div>

            <div className="gen-info-evencontent">
            <h2 className="gen-info-title">
            Shipping & Delivery
                </h2>
                <p className="gen-info-text"> 4.1. Orders are shipped within [insert time frame] of confirmation. Delivery times may vary based on the location.</p>
                <p className="gen-info-text"> 4.2. We are not liable for delays caused by natural disasters, strikes, or other unforeseen circumstances.</p>
                <p className="gen-info-text"> 4.3. For international orders, customers are responsible for any customs duties or taxes applicable in their country.</p>
            </div>

            
            <div className="gen-info-oddcontent">
            <h2 className="gen-info-title">
            Return, Exchange, and Refund Policy
                </h2>
                <p className="gen-info-text"> To ensure fairness for both customers and our brand:</p>
                <p className="gen-info-text"> 5.1. Returns and Exchanges:</p>
    <ul>
        <li>
            <p className="gen-info-text"> Products can be returned or exchanged within 7-14 days of delivery if they are unused, unopened, and in their original packaging.</p>
        </li>
        <li>
            <p className="gen-info-text"> Items purchased on sale or as part of a promotion are non-returnable and non-refundable unless damaged in transit.</p>
        </li>
    </ul>

                <p className="gen-info-text"> 5.2. Refunds:
Refunds will only be processed if the product received is defective or incorrect.
Refunds are processed within 7-10 business days after the returned product has been inspected.</p>
                <p className="gen-info-text">5.3. To initiate a return or exchange, please contact our Customer Support at [support email/contact details].</p>
                <p className="gen-info-text">Note: Return shipping costs will be borne by the customer unless the product is defective or incorrectly delivered.</p>
            </div>

            <div className="gen-info-evencontent">
            <h2 className="gen-info-title">
            Cancellations
                </h2>
                <p className="gen-info-text"> 6.1. Orders can only be canceled within [insert timeframe, e.g., 12/24 hours] of placing the order. Beyond this timeframe, cancellations are not allowed</p>
                <p className="gen-info-text"> 6.2. For prepaid orders, the refund will be processed to the original payment method within [insert timeframe, e.g., 5-7 business days]</p>
            </div>

            <div className="gen-info-oddcontent">
            <h2 className="gen-info-title">
            User Accounts
                </h2>
                <p className="gen-info-text"> 7.1. Customers may create accounts on our website to access personalized services and order history</p>
                <p className="gen-info-text"> 7.2. You are responsible for maintaining the confidentiality of your account and password.</p>
            </div>

            <div className="gen-info-evencontent">
            <h2 className="gen-info-title">
            Privacy Policy
                </h2>
                <p className="gen-info-text"> 8.1. We value your privacy. Any personal information provided during registration or purchase is handled in accordance with our [Privacy Policy link].</p>
            </div>

            <div className="gen-info-oddcontent">
            <h2 className="gen-info-title">
            Intellectual Property
                </h2>
                <p className="gen-info-text"> 9.1. All content on this site, including images, text, and trademarks, is the property of Zennaura. Unauthorized reproduction or use is strictly prohibited.</p>
            </div>

            <div className="gen-info-evencontent">
            <h2 className="gen-info-title">
            Liability Disclaimer
                </h2>
                <p className="gen-info-text"> 10.1. We are not liable for any damage caused by misuse of products purchased from us.</p>
                <p className="gen-info-text"> 10.2. In no case shall Zennaura, our directors, employees, affiliates, or agents be held responsible for any indirect or consequential damages.</p>
            </div>

            <div className="gen-info-oddcontent">
            <h2 className="gen-info-title">
            Governing Law
                </h2>
                <p className="gen-info-text"> These Terms and Conditions are governed by the laws of [insert jurisdiction]. Any disputes arising from these terms will be resolved in the courts of [insert jurisdiction].</p>
            </div>

            <div className="gen-info-evencontent">
            <h2 className="gen-info-title">
            Contact Us
                </h2>
                <p className="gen-info-text"> For any questions or concerns regarding these terms, please contact us at:</p>
                <p className="gen-info-text"> Email: [Your Email Address]</p>
                <p className="gen-info-text"> Phone: [Your Phone Number]</p>
            </div>
        </div>
        </>
        
    )
}

export default GenInfo;