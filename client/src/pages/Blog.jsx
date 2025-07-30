import React from 'react';

const Blog = () => {
  return (
    <div className="px-4 md:px-6 py-12 max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-primary mb-6">Inside PriCart</h1>

      {/* Intro */}
      <p className="text-gray-700 text-base mb-6">
        This space is where we occasionally share things we’re working on, lessons we’ve learned, and thoughts on building a better grocery experience.
      </p>

      {/* What You'll Find */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">What We Write About</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-1">
          <li>Behind-the-scenes decisions (product, delivery, tech)</li>
          <li>Short updates from the team</li>
          <li>Thoughts on grocery logistics and customer experience</li>
          <li>Learnings from running a startup in India</li>
        </ul>
      </section>

      {/* No Posts Yet Section */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">No Posts Yet</h2>
        <p className="text-gray-600 text-base">
          We haven’t published anything here yet, but plan to share more soon. In the meantime, you can reach us anytime at{' '}
          <a href="mailto:hello@pricart.com" className="text-primary-dark underline">
            blog@pricart.com
          </a>.
        </p>
      </section>
    </div>
  );
};

export default Blog;
