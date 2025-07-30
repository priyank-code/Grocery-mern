import React from 'react';

const Press = () => {
  return (
    <div className="px-4 md:px-6 py-12 max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-primary mb-6">Press & Media</h1>

      {/* Intro */}
      <p className="text-gray-700 text-base mb-6">
        Thanks for your interest in PriCart. We’re happy to support journalists, bloggers, and writers who want to feature our story or platform. Below you’ll find background information about the company and how to reach us.
      </p>

      {/* About Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">About PriCart</h2>
        <p className="text-gray-700 text-base mb-3">
          PriCart is a modern grocery platform that helps people get fresh essentials delivered with ease. We started with a simple goal: make grocery shopping faster, better, and more reliable for everyday households.
        </p>
        <p className="text-gray-700 text-base">
          We currently operate across several cities in India and are focused on growing sustainably while keeping customer experience at the core of everything we build.
        </p>
      </section>

      {/* Coverage Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">Previous Coverage</h2>
        <p className="text-gray-700 text-base mb-2">
          Our story has been shared by a number of independent blogs, local publications, and product newsletters. We appreciate when people take the time to understand what we’re doing and share it with their audience.
        </p>
        <p className="text-gray-700 text-base">
          If you’re looking for quotes, a short summary, or background details — feel free to contact us directly.
        </p>
      </section>

      {/* Contact Section */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">Media Contact</h2>
        <p className="text-gray-700 text-base">
          For press inquiries, interviews, or media questions, reach out to our team at:{' '}
          <a href="mailto:media@pricart.com" className="text-primary-dark underline">
            media@pricart.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default Press;
