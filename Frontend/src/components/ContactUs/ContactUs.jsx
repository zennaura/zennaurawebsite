import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      firstname: form[0].value,
      lastname: form[1].value,
      email: form[2].value,
      phone: form[3].value,
      subject: form[4].value,
      message: form[5].value,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Your message has been sent successfully!");
        form.reset();
      } else {
        alert(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to submit. Please try again later.");
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Get In Touch</h1>
      <p className="contact-description">
        For immediate answers to questions about shipping, deliveries, and other frequent concerns, please check our
        <a href="#" className="faq-link">FAQs page</a>. This might save you time and provide you with a quick solution or you can get in touch by
        filling out this form and we will get back to you within 24 Business Hours.
      </p>

      <div className="contact-main">
        <div className="contact-info">
          <h2>Contact Information</h2>
          <p>Give us a call, send us an email to have a chat, we are always here to help out in whatever way we can.</p>
          <div className="contact-details">
            <div><span>📞</span> <span>+91 7058183615</span></div>
            <div><span>📧</span> <span>support@zennAura.com</span></div>
            <div><span>📍</span> <span>New Delhi, India</span></div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Last Name" required />
          </div>
          <div className="form-row">
            <input type="email" placeholder="Email" required />
            <input type="tel" placeholder="Phone" required />
          </div>
          <input type="text" placeholder="Your Subject" required />
          <textarea rows="4" placeholder="Write your message here" required></textarea>
          <button type="submit">SEND MESSAGE</button>
        </form>
      </div>

      <div className="contact-extra">
        <div>
          <h2>For Complaints & Refund Related Queries</h2>
          <p>Facing any issues with your refund process or want us to improve something?<br />We are always there to listen to you.</p>
          <div>
            <div><span>📞</span> <span>+91 95281 86866</span></div>
            <div><span>📧</span> <span>support@zennAura.com</span></div>
          </div>
        </div>

        <div>
          <h2>Business and Career Inquiries</h2>
          <p>For B2B relations or career opportunities, please reach out to us and we will get back to you as soon as possible.</p>
          <div><span>📧</span> <span>connect@zennAura.com</span></div>
        </div>

        <div>
          <h2>You can also Reach out to us through Whatsapp</h2>
          <div><span>📱</span> <span>+91 95281 86866</span></div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;