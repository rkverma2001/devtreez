// components/GrowthSection.jsx

import ServiceCard from "./ServiceCard";

export default function GrowthSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-semibold text-gray-900">
            How We Power Your Growth ?
          </h2>
          <p className="mt-4 text-gray-500 text-lg">
            Intelligent Digital Experiences, Built Around Your Vision
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-12">
          <ServiceCard
            image="/website.svg"
            title="Website Development"
            description="Your Brand, Beautifully Built Online."
          />

          <ServiceCard
            image="/app.svg"
            title="Application Development"
            description="Apps That Bring Your Vision to Every Screen"
          />
        </div>

      </div>
    </section>
  );
}