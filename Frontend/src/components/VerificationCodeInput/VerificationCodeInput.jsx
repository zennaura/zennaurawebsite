import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import './VerificationCodeInput.css';

const VerificationCodeInput = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [actualCode, setActualCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.userEmail || "";
  const formData = location.state?.formData || {};

  const emailSentRef = useRef(false);

  useEffect(() => {
    if (!userEmail) {
      alert("No email provided. Redirecting...");
      navigate("/");
      return;
    }

    if (!emailSentRef.current) {
      emailSentRef.current = true; // ✅ Set before calling generateCode
      generateCode();
    }
  }, [userEmail, navigate]);

  const generateCode = () => {
    // console.log("Generating code and sending email...");
    const newCode = Array(6)
      .fill()
      .map(() => Math.random().toString(36).charAt(2).toUpperCase())
      .join('');
    setActualCode(newCode);

    const newMessage = `Hello,\n\nYour ZennAura verification code is: ${newCode}\n\nPlease enter this code in the verification screen to continue.\n\nIf you did not request this code, please ignore this email.\n\nThank you,\nThe ZennAura Team`;
    setMessage(newMessage);
    sendCodeToBackend(newMessage);
  };

  const sendCodeToBackend = async (message) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/email/sendMail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: userEmail,
          message: message
        })
      });
      const data = await response.json();
      if (!data.success) {
        console.error("Email send failed:", data.message);
        toast.error("Failed to send verification email.");
      }
    } catch (err) {
      console.error("Failed to send email:", err);
      toast.error("Failed to send verification email.");
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value.toUpperCase();
    if (/^[0-9A-Z]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError("");

      if (value && index < 5) {
        document.getElementById(`VerificationCodeInput-box-${index + 1}`).focus();
      } else if (!value && index > 0) {
        document.getElementById(`VerificationCodeInput-box-${index - 1}`).focus();
      }
    }
  };

  const handleContinue = async () => {
    const enteredCode = code.join("");
    if (enteredCode === actualCode) {
      try {
        // console.log("Sending formData to backend:", formData);
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/auth/register`, formData);
        if (response.data.success) {
          toast.success(response.data.message);
          navigate('/login');
        } else {
          toast.error(response.data.message || "Registration failed. Please try again.");
        }
      } catch (err) {
        console.error("Registration failed:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Registration failed. Please try again.");
        setError(err.response?.data?.message || "Registration failed. Please try again.");
      }
    } else {
      toast.error("Incorrect code. Please try again.");
      setError("Incorrect code. Please try again.");
    }
  };

  const handleResend = () => {
    generateCode();
    alert("Verification code resent.");
  };

  return (
    <div className="VerificationCodeInput-container">
      <img
        src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
        alt="Verification"
        className="VerificationCodeInput-icon"
      />
      <p className="VerificationCodeInput-message">
        We have sent a verification code to your Email Address. Please enter the verification code below to continue.
      </p>
      <div className="VerificationCodeInput-box-wrapper">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`VerificationCodeInput-box-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            className="VerificationCodeInput-box"
          />
        ))}
      </div>
      {error && <p className="VerificationCodeInput-error">{error}</p>}
      <button className="VerificationCodeInput-continue" onClick={handleContinue}>
        Continue
      </button>
      <p className="VerificationCodeInput-resend-text">
        Didn’t get the code?{" "}
        <span className="VerificationCodeInput-resend-link" onClick={handleResend}>
          Resend Code
        </span>
      </p>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default VerificationCodeInput;
