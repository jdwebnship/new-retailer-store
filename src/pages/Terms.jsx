import React from "react";
import CommonHeader from "../components/CommonHeader";

const Terms = () => {
  const terms = [
    {
      title: " Use of the Site",
      content:
        "You must be at least 18 years old to use this site. The content provided is for general information only and may be subject to change without notice.",
    },
    {
      title: "Intellectual Property",
      content:
        "All content, including images, logos, and text, are the property of our company unless otherwise stated. Unauthorized use may lead to legal action.",
    },
    {
      title: "User Accounts",
      content:
        "If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.",
    },
    {
      title: "Orders & Payments",
      content:
        "All purchases made through the site are subject to availability and confirmation of the order. We reserve the right to refuse or cancel any order at our discretion.",
    },
    {
      title: "Limitation of Liability",
      content:
        "We shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our website or services.",
    },
    {
      title: "Modifications",
      content:
        "We reserve the right to update or change these terms at any time without prior notice. Continued use of the site constitutes acceptance of those changes.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions about these Terms and Conditions, feel free to contact our support team via email or phone.",
    },
  ];

  return (
    <>
      <CommonHeader title="Terms & Conditions" />
      <div className="px-5 mx-auto py-[3.125rem] lg:py-[100px] min-h-screen flex flex-col">
        <div className="container mx-auto">
          <div className="rounded-lg">
            <p className="mb-5 lg:mb-8 text-left text-base lg:text-xl">
              By accessing and using this website, you agree to be bound by the
              following terms and conditions. If you do not agree with any part
              of these terms, please do not use our website.
            </p>
            <div className="space-y-5 lg:space-y-8">
              {terms.map((term, index) => (
                <div key={index}>
                  <h2 className="text-lg lg:text-2xl font-bold mb-2 text-left">
                    {term.title}
                  </h2>
                  <p className="text-left text-base lg:text-lg">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;
