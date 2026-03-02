// components/ServiceCard.jsx

export default function ServiceCard({ image, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center
                    hover:shadow-2xl transition-all duration-300 cursor-pointer">

      {/* Image */}
      <div className="mb-6">
        <img
          src={image}
          alt={title}
          className="mx-auto h-52 object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-gray-500">
        {description}
      </p>

      {/* Button */}
      <button className="mt-6 bg-gradient-to-r from-green-500 to-green-600
                         px-6 py-3 rounded-lg font-semibold text-white
                         shadow-md hover:shadow-lg
                         hover:from-green-600 hover:to-green-700
                         transition-all duration-300 cursor-pointer">
        Explore More →
      </button>
    </div>
  );
}