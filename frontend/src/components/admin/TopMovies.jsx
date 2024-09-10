import React from "react";

// Replace these with actual image URLs for the movies
const movieImages = {
  Inception: "https://via.placeholder.com/50?text=Inception",
  "The Dark Knight": "https://via.placeholder.com/50?text=The+Dark+Knight",
  Interstellar: "https://via.placeholder.com/50?text=Interstellar",
  "The Matrix": "https://via.placeholder.com/50?text=The+Matrix",
  "Pulp Fiction": "https://via.placeholder.com/50?text=Pulp+Fiction",
};

const TopMovies = () => {
  const movies = [
    { title: "Inception", views: 200 },
    { title: "The Dark Knight", views: 180 },
    { title: "Interstellar", views: 150 },
    { title: "The Matrix", views: 140 },
    { title: "Pulp Fiction", views: 130 },
  ];

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Top Movies</h2>
      <ul className="space-y-4">
        {movies.map((movie, index) => (
          <li key={index} className="flex items-center space-x-4">
            <img
              src={movieImages[movie.title]}
              alt={movie.title}
              className="w-12 h-12 object-cover rounded-md"
            />
            <div className="flex-1">
              <span className="block text-lg font-medium">{movie.title}</span>
              <span className="text-sm text-gray-600">{movie.views} Views</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopMovies;
