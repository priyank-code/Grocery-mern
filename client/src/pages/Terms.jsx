import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
const Terms = () => {
  const {navigate} = useContext(AppContext);
  return (
    <div className="px-4 md:px-6 py-12 max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-primary mb-6">Terms & Conditions</h1>

      {/* Intro */}
      <p className="text-gray-700 text-base mb-6">
        By using PriCart, you agree to the terms laid out on this page. These are here to make things fair and clear for both you and us.
      </p>

      {/* Section: Account & Usage */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">1. Account & Usage</h2>
        <p className="text-gray-700 mb-2">
          You must be at least 18 years old to place an order on PriCart. You’re responsible for keeping your login details safe, and for making sure your address and contact information are correct.
        </p>
        <p className="text-gray-700">
          If we detect suspicious or abusive activity, we may suspend or remove your access.
        </p>
      </section>

      {/* Section: Orders & Payments */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">2. Orders & Payments</h2>
        <p className="text-gray-700 mb-2">
          Orders are confirmed only after successful payment. We do our best to deliver everything on time and in good condition, but delays or substitutions may happen in rare cases.
        </p>
        <p className="text-gray-700">
          If something isn’t right, contact us — we’ll make it right where possible.
        </p>
      </section>

      {/* Section: Cancellations & Refunds */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">3. Cancellations & Refunds</h2>
        <p className="text-gray-700">
          You can cancel your order before it’s out for delivery. Refunds are processed within 5–7 business days depending on your payment method.
        </p>
      </section>

      {/* Section: Privacy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">4. Privacy</h2>
        <p className="text-gray-700">
          We take your privacy seriously. Read our{' '}
          <a onClick={() => navigate("/privacy")} className="text-primary-dark underline">
            Privacy Policy
          </a>{' '}
          to understand how your data is collected and used.
        </p>
      </section>

      {/* Section: Changes */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">5. Updates to Terms</h2>
        <p className="text-gray-700">
          These terms may change from time to time. If it’s a major change, we’ll try to let you know. Continued use of PriCart means you accept the latest version.
        </p>
      </section>
    </div>
  );
};

export default Terms;
