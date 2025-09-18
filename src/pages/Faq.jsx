import React, { useState } from "react";
import CommonHeader from "../components/CommonHeader";
import { useTheme } from "../contexts/ThemeContext";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const faqItems = [
    {
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package on our website or the courier's website.",
    },
    {
      question: "What is the return policy?",
      answer:
        "We offer a 7-day return policy for most items. Products must be unused and in original packaging to qualify for a return or replacement.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Standard delivery typically takes 3-5 business days. Express delivery options are available at checkout for faster shipping.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "You can cancel your order within 1 hour of placing it. After that, please contact our customer support team for assistance.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit/debit cards, PayPal, and select digital wallets. All transactions are secure and encrypted.",
    },
    {
      question: "Is cash on delivery available?",
      answer:
        "Yes, we offer cash on delivery for most locations. This option will be shown during checkout if available for your address.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination and will be calculated at checkout.",
    },
    {
      question: "How do I apply a discount coupon?",
      answer:
        "Enter your coupon code in the 'Promo Code' field during checkout and click 'Apply'. The discount will be automatically calculated.",
    },
    {
      question: "Why is my order delayed?",
      answer:
        "Delays can occur due to high order volume, weather conditions, or carrier delays. You'll receive updates via email if there are any delays with your order.",
    },
    {
      question: "Can I change my delivery address after placing an order?",
      answer:
        "Address changes can only be made if the order hasn't been shipped. Please contact our customer support immediately for assistance.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const { theme, bottomFooterTextColor, textColor } = useTheme();

  return (
    <>
      <CommonHeader title="Frequently Asked Questions" />
      <div className="px-5 mx-auto py-[3.125rem] lg:py-[100px] min-h-screen flex flex-col">
        <div className="container mx-auto">
          <div className="rounded-lg">
            <div className="space-y-4 lg:space-y-6">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`border border-gray-300  rounded-xl transition-all duration-500 transform overflow-hidden ${
                    activeIndex === index ? "scale-[1]" : "hover:scale-[1]"
                  }`}
                  style={{
                    backgroundColor:
                      theme?.bottomFooterBackgroundColor || "#1f2937",
                    color: bottomFooterTextColor || "#ffffff",
                  }}
                >
                  <button
                    className="w-full text-left px-6 py-4 hover flex cursor-pointer justify-between items-center focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={activeIndex === index}
                    aria-controls={`faq-${index}`}
                  >
                    <span className="text-lg font-bold">{item.question}</span>
                    <span className="text-3xl">
                      {activeIndex === index ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    id={`faq-${index}`}
                    className={`px-6 overflow-hidden transition-all duration-300 text-left ${
                      activeIndex === index ? "max-h-96 py-4" : "max-h-0 py-0"
                    }`}
                    style={{
                      backgroundColor: theme.backgroundColor,
                      color: textColor,
                    }}
                  >
                    <p className="">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
