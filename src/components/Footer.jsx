import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const navigationLinks = [
    { name: "Home", href: "/home" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const contactInfo = [
    { label: "Address", info: "123 Library St., City, Country" },
    { label: "Email", info: "info@librarysystem.com" },
    { label: "Phone", info: "+123 456 7890" },
  ];

  const socialMediaLinks = [
    { icon: <FaFacebookF size={20} />, href: "#" },
    { icon: <FaTwitter size={20} />, href: "#" },
    { icon: <FaInstagram size={20} />, href: "#" },
    { icon: <FaLinkedinIn size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Navigation Links */}
          <div className="mb-4 w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul>
              {navigationLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <a href={link.href} className="hover:text-gray-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-4 w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            {contactInfo.map((contact, index) => (
              <p key={index} className="mb-2">
                {contact.label}: {contact.info}
              </p>
            ))}
          </div>

          {/* Social Media Links */}
          <div className="mb-4 w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              {socialMediaLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="hover:text-gray-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center mt-6">
          <p className="text-sm">
            © 2024 Library Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
