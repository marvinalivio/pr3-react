import Header from "./components/header";
import Footer from "./components/footer";
import UserDetails from "./components/UserDetails";
import Register from "./components/register/register";
import Login from "./components/login/login";
import { UserProvider } from "./useContext/useContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieDetails from "./components/movieDetails";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Header />
        <div className="akoSiMarvin">
          <Routes>
            <Route path="*" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userDetails" element={<UserDetails />} /> {/* Corrected the path */}
            <Route path="userDetails/MovieDetails/:movie_id/:original_title" element={<MovieDetails />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;
