import React from 'react';

const Privacy = () => {
  return (
    <div className="px-4 md:px-6 py-12 max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-primary mb-6">Privacy Policy</h1>

      {/* Intro */}
      <p className="text-gray-700 text-base mb-6">
        At PriCart, your privacy matters to us. This policy explains what information we collect, how we use it, and how we keep it safe.
      </p>

      {/* What We Collect */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">Information We Collect</h2>
        <p className="text-gray-700 mb-2">
          To provide you with a smooth grocery shopping experience, we collect details like your name, email address, delivery location, and payment information.
        </p>
        <p className="text-gray-700">
          This information is used only to process your orders, communicate with you about your purchases, and improve our services.
        </p>
      </section>

      {/* How We Use Your Info */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">How We Use Your Information</h2>
        <p className="text-gray-700">
          We use your data to:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
          <li>Process and deliver your orders accurately and on time</li>
          <li>Communicate important updates about your orders</li>
          <li>Improve and personalize your shopping experience</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      {/* Data Protection */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">Data Protection</h2>
        <p className="text-gray-700">
          We take reasonable measures to keep your information secure and confidential. However, no online system is 100% secure, so please be mindful when sharing sensitive data.
        </p>
      </section>
    </div>
  );
};

export default Privacy;
