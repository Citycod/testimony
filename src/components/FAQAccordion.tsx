import React, { useState, useRef, useEffect } from 'react';
import logo from '/public/images/logo.avif'; // Make sure you have your Harvest Nexus logo here

interface FAQ {
  question: string;
  answer: string;
}


const faqs: FAQ[] = [
  {
    question: 'What is Harvest Nexus?',
    answer:
      'Harvest Nexus is a platform designed to help farmers boost productivity and sustainability through smart irrigation, precision farming, and access to modern tools. Our goal is to make agriculture more efficient, eco-friendly, and rewarding.',
  },
  {
    question: 'How do I sign up as a farmer?',
    answer:
      'Click "Join as Farmer" on the homepage, provide your farm details, and verify your email to start accessing tools, resources, and market connections.',
  },
  {
    question: 'How does Harvest Nexus support fair returns?',
    answer:
      'We connect farmers directly with buyers and provide access to reliable storage and logistics. This ensures every harvest gets fair pricing without unnecessary middlemen.',
  },
  {
    question: 'What sustainable farming practices are promoted?',
    answer:
      'Harvest Nexus encourages precision farming, smart irrigation, and other eco-friendly techniques to reduce waste, improve yields, and protect the environment.',
  },
  {
    question: 'Can buyers track their produce?',
    answer:
      'Yes! Buyers can monitor produce availability, quality, and delivery schedules to make informed purchasing decisions efficiently.',
  },
  {
    question: 'What support is available for new users?',
    answer:
      'We provide onboarding webinars, 24/7 chat support, and a detailed knowledge base to guide farmers and buyers through every step of the platform.',
  },
];

const FAQAccordion: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const answerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    faqs.forEach((_, index) => {
      const el = answerRefs.current[index];
      if (el) {
        el.style.height = activeIndex === index ? `${el.scrollHeight}px` : '0px';
      }
    });
  }, [activeIndex]);

  return (
    <div className="max-w-4xl p-6 mx-auto">
      {/* Logo and Title */}
      <div className="flex items-center mb-10">
        <img src={logo} alt="Harvest Nexus Logo" className="mr-4 w-14 h-14" />
        <h1 className="text-3xl font-bold text-green-700">Harvest Nexus FAQs</h1>
      </div>

      {/* FAQ Items */}
      {faqs.map((faq, index) => (
        <div
          key={index}
          className={`border-b border-gray-300 transition-colors duration-300 ${
            activeIndex === index ? 'bg-green-50' : ''
          }`}
        >
          <button
            className="flex items-center justify-between w-full py-4 text-lg font-medium text-left focus:outline-none hover:text-green-600"
            onClick={() => toggleFAQ(index)}
            aria-expanded={activeIndex === index}
          >
            <span>{faq.question}</span>
            <span
              className={`text-2xl transform transition-transform duration-300 ${
                activeIndex === index ? 'rotate-45' : 'rotate-0'
              }`}
            >
              +
            </span>
          </button>

          <div
  ref={(el) => {
    answerRefs.current[index] = el;
  }}
  className="overflow-hidden transition-[height] duration-300 ease-in-out"
  style={{ height: 0 }}
>
  <p className="py-2 text-gray-700">{faq.answer}</p>
</div>

        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
