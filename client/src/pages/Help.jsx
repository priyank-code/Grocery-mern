import React from 'react';

const Help = () => {
  return (
    <div className="px-4 md:px-6 py-12 max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-primary mb-6">Help Center</h1>

      {/* Intro */}
      <p className="text-gray-700 text-base mb-6">
        Need help? You’ll find answers to common questions about orders, payments, and deliveries here. If you can’t find what you’re looking for, feel free to reach out to us.
      </p>

      {/* FAQ Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-dark mb-4">Frequently Asked Questions</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>
            <strong>How can I track my order?</strong>  
            <p className="text-gray-600 ml-4 mt-1">
              Once your order ships, we’ll send you a tracking link via email and SMS so you can follow its progress.
            </p>
          </li>
          <li>
            <strong>What payment methods do you accept?</strong>  
            <p className="text-gray-600 ml-4 mt-1">
              We accept all major credit and debit cards, UPI, and popular digital wallets.
            </p>
          </li>
          <li>
            <strong>Can I cancel or modify my order?</strong>  
            <p className="text-gray-600 ml-4 mt-1">
              You can cancel or change your order before it is out for delivery. Just contact our support team as soon as possible.
            </p>
          </li>
        </ul>
      </section>

      {/* Contact Support */}
      <section>
        <p className="text-gray-700">
          Still need help? Email us anytime at{' '}
          <a href="mailto:support@pricart.com" className="text-primary-dark underline">
            support@pricart.com
          </a>.
        </p>
      </section>
    </div>
  );
};

export default Help;
