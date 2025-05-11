import React, { useState } from 'react';
import './FQApage.css';

const faqs = [
  "How can we charge our natural stone bracelets?",
  "Can you customize the bracelet with some specific stones?",
  "Which hand should we wear it in?",
  "Should we wear the bracelets as per zodiac signs?",
  "Why there are cracks on the natural stone?",
];

const FQApage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Common Questions Asked</h2>
      <div className="faq-box">
        {faqs.map((question, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {question}
              <span className={`faq-icon-circle ${activeIndex === index ? 'open' : ''}`}>
                {activeIndex === index ? '˄' : '˅'}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">Answer for: {question}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FQApage;
