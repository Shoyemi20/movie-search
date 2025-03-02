import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { FaCalendarAlt, FaStar } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import Loader from "../components/Loader";

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const navigate = useNavigate(); 
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch movie details from OMDB API
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?i=${id}&apikey=${
            import.meta.env.VITE_APP_OMDB_API_KEY
          }`
        );
        if (response.data.Response === "True") {
          setMovieDetails(response.data);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError("Unable to fetch movie details.", err);
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  // Go back to the previous page
  const goBack = () => {
    navigate(-1); 
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8 min-h-screen bg-gray-900 px-24">
      {/* Go Back Button */}
      <button
        onClick={goBack}
        className="text-3xl mb-6 bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
      >
        Go Back
      </button>

      {movieDetails && (
        <div className="flex justify-center gap-12">
          {/* Movie Poster */}
          <figure className="bg-gray-800 p-3 rounded-lg shadow-lg">
            <img
              src={movieDetails.Poster}
              alt={movieDetails.Title}
              className="w-[35rem] h-full object-cover rounded-lg"
            />
          </figure>

          {/* Movie Details */}
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl font-bold mb-2 text-white">
              {movieDetails.Title}
            </h1>

            {/* Movie Metadata */}
            <p className="flex gap-4 items-center">
              <span className="text-white border-2 rounded-sm text-xs border-white p-1 font-semibold">
                {movieDetails.Rated}
              </span>
              <span className="bg-white text-gray-900 text-xs rounded-sm border-2 border-white py-1 px-3 font-semibold">
                HD
              </span>
              <span className="text-gray-400">{movieDetails.Genre}</span>
            </p>

            {/* Release Date, Runtime, and Rating */}
            <p className="flex items-center text-[15px] font-medium mt-2 gap-4 text-gray-300">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-yellow-400" />
                {movieDetails.Released}
              </span>
              <span className="flex items-center gap-1">
                <IoTime className="text-yellow-400" />
                {movieDetails.Runtime}
              </span>
              <span className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                {movieDetails.imdbRating}/10
              </span>
            </p>

            {/* Movie Plot */}
            <p className="text-gray-400 text-lg">{movieDetails.Plot}</p>

            {/* Additional Details */}
            <p className="text-white font-medium text-lg">
              Director :{" "}
              <span className="text-gray-300">{movieDetails.Director}</span>
            </p>
            <p className="text-white font-medium text-lg">
              Cast :{" "}
              <span className="text-gray-300">{movieDetails.Actors}</span>
            </p>
            <p className="text-white font-medium text-lg">
              Box Office :{" "}
              <span className="text-gray-300">{movieDetails.BoxOffice}</span>
            </p>
            <p className="text-white font-medium text-lg">
              Language :{" "}
              <span className="text-gray-300">{movieDetails.Language}</span>
            </p>
            <p className="text-white font-medium text-lg">
              Writer :{" "}
              <span className="text-gray-300">{movieDetails.Writer}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;