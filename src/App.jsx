import { Routes, Route } from "react-router-dom";
import SearchScreen from "./components/SearchScreen";
import "./index.css";
import MovieDetails from "./pages/MovieDetails";


function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchScreen />} />
      <Route path="/movie/:id" element={<MovieDetails />} /> 
    </Routes>
  );
}


export default App;