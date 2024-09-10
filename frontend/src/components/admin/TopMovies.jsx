import React from "react";

// Replace these with actual image URLs for the movies
const movieImages = {
  Inception:
    "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
  "The Dark Knight":
    "https://m.media-amazon.com/images/S/pv-target-images/e9a43e647b2ca70e75a3c0af046c4dfdcd712380889779cbdc2c57d94ab63902.jpg",
  Interstellar:
    "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg",
  "The Matrix":
    "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg",
  "Inside Out 2":
    "https://i5.walmartimages.com/seo/Disney-Inside-Out-2-Group-Wall-Poster-22-375-x-34_1e399b0f-decd-4a13-a07d-fcc554f94758.06b13e3f7af966dbb93fec308d345665.jpeg",
};

const TopMovies = () => {
  const movies = [
    { title: "Inception", views: 200, year: 2010 },
    { title: "The Dark Knight", views: 180, year: 2008 },
    { title: "Interstellar", views: 150, year: 2014 },
    { title: "The Matrix", views: 140, year: 1999 },
    { title: "Inside Out 2", views: 130, year: 2023 },
  ];

  return (
    <div className="top-movies bg-white p-6 shadow-md rounded-lg max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Top Movies</h2>
      <ul className="list-none space-y-4">
        {movies.map((movie, index) => (
          <li
            key={index}
            className="movie-item flex items-center space-x-4 hover:bg-gray-100"
          >
            <img
              src={movieImages[movie.title]}
              alt={movie.title}
              className="w-16 h-16 object-cover rounded-md mr-5"
            />
            <div className="flex-1">
              <span className="block text-lg font-medium">{movie.title}</span>
              <span className="text-sm text-gray-600">{movie.views} Views</span>
              <span className="text-sm text-gray-600">({movie.year})</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleDetailsClick(movie.title)}
              >
                Details
              </button>
              <StarRating rating={movie.rating} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const handleDetailsClick = (title) => {
  // Implement logic to navigate to a movie details page
  console.log(`Clicked Details for ${title}`);
};

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
        ★
      </span>
    );
  }
  return <div className="star-rating">{stars}</div>;
};

export default TopMovies;
