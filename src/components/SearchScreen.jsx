import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const searchMovie = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a movie title.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=${
          import.meta.env.VITE_APP_OMDB_API_KEY
        }`
      );
      if (response.data.Response === "True") {
        setMovie(response.data.Search);
      } else {
        setError(response.data.Error || "No movies found.");
        setMovie([]);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err); 
    }
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchMovie();
    }
  };

  const viewDetails = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Search for a Movie
      </h1>

      <div className="mb-6 flex justify-center">
        <div className="bg-gray-800 w-3/4 h-14 flex justify-between rounded-lg">
          <input
            type="text"
            placeholder="Enter movie title..."
            className="px-4 py-2 rounded-lg w-[85%] text-white bg-transparent outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={searchMovie}
            disabled={loading} 
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 border-4 border-gray-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {loading && <Loader />}

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {!loading && movie.length === 0 && !error && (
        <p className="text-gray-400 text-center">
          No movies found. Try searching for something else.
        </p>
      )}

      <div className="flex gap-8 flex-wrap justify-center">
        {movie &&
          movie.map((item, index) => (
            <div
              key={index}
              onClick={() => viewDetails(item.imdbID)}
              className="bg-gray-800 p-2 text-center rounded-lg shadow-xl w-52 cursor-pointer"
            >
              <figure>
                <img
                  src={item.Poster}
                  alt={item.Title}
                  className="rounded-lg mb-4 w-48 h-64 object-cover"
                />
              </figure>
              <div>
                <h2 className="text-xl font-bold text-white">{item.Title}</h2>
                <span className="text-gray-400">({item.Year})</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchScreen;