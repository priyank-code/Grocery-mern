import React from "react";
import { Link } from "react-router-dom";
import { assets, footerLinks } from "../assets/assets";

const linkedinUrl = "https://www.linkedin.com/in/priyankvaghani";
const developerName = "Priyank Vaghani";

const Footer = () => {
  return (
    <footer className="mt-24 border-t-2 border-gray-200 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Main Section */}
        <div className="flex flex-col md:flex-row justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
          {/* Left Info */}
          <div className="flex-1 min-w-[250px]">
            <img src={assets.logo} alt="logo" className="w-30" />
            <p className="max-w-md mt-6">
              PriCart delivers fresh groceries, snacks, and essentials right to
              your door. Trusted by thousands, we make everyday shopping easy,
              fast, and affordable.
            </p>

          </div>

          {/* Right Links */}
          <div className="flex flex-wrap gap-8 flex-1 min-w-[280px] justify-between">
            {footerLinks.map((section, index) => (
              <div key={index} className="min-w-[120px]">
                <h3 className="font-semibold text-base text-gray-900 mb-3 md:mb-5">
                  {section.title}
                </h3>
                <ul className="text-sm space-y-1">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      {link.to ? (
                        <Link
                          to={link.to}
                          className="hover:underline transition whitespace-nowrap"
                        >
                          {link.text}
                        </Link>
                      ) : (
                        <a
                          href={link.href || "#"}
                          target={link.external ? "_blank" : "_self"}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          className="hover:underline transition whitespace-nowrap"
                        >
                          {link.text}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-sm md:text-base text-gray-500/80">
          <p>© {new Date().getFullYear()} PriCart. All rights reserved.</p>

          <p className="text-center">
            Designed &amp; Developed by{" "}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              {developerName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
