import React from 'react';

const Careers = () => {
  return (
    <div className="px-4 md:px-6 py-12 max-w-5xl mx-auto">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-primary mb-6">Careers at PriCart</h1>

      {/* Intro */}
      <p className="text-gray-700 text-base mb-8">
        We're building a better grocery experience — simple, fast, and reliable. If you’re passionate about solving real problems and want to work with a small, focused team, check out our open roles.
      </p>

      {/* Company Values */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-primary-dark mb-3">What We Value</h2>
        <p className="text-gray-700 mb-2">
          We keep things practical — no fluff. We're remote-friendly, respectful of deep work, and care more about clear thinking than shiny resumes.
        </p>
      </section>

      {/* Job Openings */}
      <section>
        <h2 className="text-2xl font-semibold text-primary-dark mb-4">Open Positions</h2>

        <div className="space-y-4">
          {[
            { title: 'Frontend Developer', location: 'Remote / India' },
            { title: 'Backend Developer (Node.js)', location: 'Remote / India' },
            { title: 'Content & Blog Writer', location: 'Part-time / Remote' },
          ].map((job, idx) => (
            <div key={idx} className="border border-gray-200 rounded-md p-4">
              <h3 className="text-lg font-medium text-primary mb-1">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Email Footer */}
      <p className="text-sm text-gray-500 mt-10">
        Interested? Send your resume or portfolio to{' '}
        <a href="mailto:careers@pricart.com" className="text-primary-dark underline">
          careers@pricart.com
        </a>
      </p>
    </div>
  );
};

export default Careers;
