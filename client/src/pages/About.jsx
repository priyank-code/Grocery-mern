// About.jsx
import React from "react";

const About = () => {
  return (
    <section className="bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            About <span className="text-primary">PriCart</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for sustainable and healthy grocery shopping — redefining convenience with quality and care.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Mission</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              PriCart simplifies grocery shopping while promoting sustainable practices — reducing food miles, supporting regional farmers, and delivering with minimal waste.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every product we deliver reflects our commitment to freshness, sustainability, and ethical sourcing.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Our Vision</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              We envision a grocery experience where conscious consumption protects the planet, supports communities, and gives customers complete peace of mind.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Through local sourcing and smart logistics, we’re building a future where every grocery choice creates positive impact.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Why Choose <span className="text-primary">PriCart</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We bring you the best of nature with tech-powered convenience. Here’s what sets us apart:
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Eco-friendly sourcing",
            "Farm-fresh quality",
            "Fast & reliable delivery",
            "Simple reorder system",
            "Secure payments",
            "Always customer-focused",
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              <span className="text-primary text-xl">✔️</span>
              <p className="text-gray-700 text-base">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
