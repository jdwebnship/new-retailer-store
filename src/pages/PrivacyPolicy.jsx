import React from "react";
import CommonHeader from "../components/CommonHeader";

const PrivacyPolicy = () => {
  const privacySections = [
    {
      title: "Information We Collect",
      content:
        "We collect personal details such as your name, email address, contact number, etc., which you provide when using our services or registering on our platform.",
    },
    {
      title: "How We Use Your Information",
      content:
        "We use your information to improve our services, respond to inquiries, send transactional emails, and inform you about updates and offers.",
    },
    {
      title: "Data Security",
      content:
        "We implement appropriate security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.",
    },
    {
      title: "Cookies and Tracking",
      content:
        "We may use cookies and similar tracking technologies to enhance your experience. You can control cookies through your browser settings.",
    },
    {
      title: "Third-Party Services",
      content:
        "We may work with third-party vendors who assist in delivering our services. They are required to protect your data and use it only for authorized purposes.",
    },
    {
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal information. You can also opt out of promotional communications at any time.",
    },
    {
      title: "Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. The updated version will be posted on this page with the revised date.",
    },
    {
      title: "Contact Us",
      content:
        "If you have any questions or concerns about our Privacy Policy, feel free to contact us at our support email or phone number.",
    },
  ];

  return (
    <>
      <CommonHeader title="Privacy Policy" />
      <div className="px-5 mx-auto py-[3.125rem] lg:py-[100px] min-h-screen flex flex-col">
        <div className="container mx-auto">
          <div className="rounded-lg">
            {/* <h1 className="text-3xl font-bold mb-6 text-center">
              Privacy Policy
            </h1> */}
            {/* <div className="border-b border-gray-200 mb-8"></div> */}
            <div className="space-y-5 lg:space-y-8">
              <p className="mb-5 lg:mb-8 text-left text-base lg:text-xl">
                We are committed to protecting your personal information and
                your right to privacy. This Privacy Policy outlines how we
                collect, use, and protect your data.
              </p>
              {privacySections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-lg lg:text-2xl font-bold mb-2 text-left">
                    {section.title}
                  </h2>
                  <p className="text-left text-base lg:text-lg">
                    {section.content}
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

export default PrivacyPolicy;
