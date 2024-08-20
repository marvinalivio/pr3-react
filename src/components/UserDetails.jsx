import React, { useContext, useEffect, useState } from "react";
import { Context } from "../useContext/useContext";
import { Link, useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../firebase/firebase";

const UserDetails = () => {
    const { currentUser, data } = Context();
    const [showImage, setShowImage] = useState(true);
    const maxWords = 20;
    const navigate = useNavigate();

    // Initialize Firestore

    useEffect(() => {
        if (!currentUser) {
            navigate('./login');
        }
    }, [currentUser, navigate]);

    // Log the data array to ensure it's coming through as expected
    console.log(data);

    const truncateOverview = (text) => {
        const wordsArray = text.split(' ');
        return wordsArray.length > maxWords 
            ? wordsArray.slice(0, maxWords).join(' ') + '...'
            : text;
    };

    // Function to handle movie actions
    const handleMovieAction = async (action, movie) => {
        try {
            switch (action) {
                case 'add':
                    console.log("Adding movie to Firestore:", movie);
                    await addDoc(collection(db, "movies"), {
                        userId: currentUser?.uid,  // Ensure currentUser and uid are defined
                        movieId: movie.movie_id,
                        title: movie.original_title,
                        rating: movie.vote_average,
                        overview: movie.overview,
                        voteCount: movie.vote_count,
                    });
                    alert("Movie added to your list!");
                    break;
    
                // other cases...
    
                default:
                    console.log("No valid action selected");
                    break;
            }
        } catch (error) {
            console.error("Error handling movie action:", error);
        }
    };
    

    return (
        <div className="container">
            <div className="rowClass">
                <h2>Movie List</h2>
                <div className="colClass gridCols">
                    {data && data.length > 0 ? (
                        data.map((movie) => (
                            <div key={movie.movie_id} className="movieList">
                                <div className="poster">
                                    <img 
                                        src={showImage ? movie.poster_path : 'https://betravingknows.com/wp-content/uploads/2017/12/video-movie-placeholder-image.png'}
                                        alt={movie.original_title}
                                    />
                                </div>
                                <div className="movieDetails">
                                    <h3>{movie.original_title}</h3>
                                    <p className="rating">
                                        <img src="../star.svg" alt="rating"/> {movie.vote_average}
                                    </p>
                                    <p>{truncateOverview(movie.overview)}</p>
                                    <p className="like">
                                        <img src="../like.svg" alt="likes"/> {movie.vote_count}
                                    </p>
                                    <Link to={`MovieDetails/${movie.movie_id}/${movie.original_title.replace(/\s+/g, '-').toLowerCase()}`}>
                                        More Details
                                    </Link>
                                    <button onClick={() => handleMovieAction('add', movie)}>
                                        Add to List
                                    </button>
                                    {/* Add more buttons for other actions if needed */}
                                    {/* <button onClick={() => handleMovieAction('remove', movie)}>
                                        Remove from List
                                    </button> */}
                                    {/* <button onClick={() => handleMovieAction('update', movie)}>
                                        Update Movie Info
                                    </button> */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
