import { useEffect } from "react";
import { Context } from "../useContext/useContext";
import { useParams, useNavigate } from "react-router-dom";

const MovieDetails = () => {
    const { currentUser, movieData } = Context();
    const { movie_id } = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        if (!currentUser) {
            navigate('/login');
        }
    })

    console.log("movie_id:", movie_id); // Log movie_id for debugging

    // Ensure both movie_id and movie.movie_id are of the same type
    const movie = movieData.find(movie => String(movie.movie_id) === String(movie_id));


    if (!movie) {
        return <div>Movie not found</div>; // Handle case when movie is not found
    }

    const fallBackImage = (cast) => {
        if (!cast.profile_path || cast.profile_path === 'https://image.tmdb.org/t/p/original') {
            return 'https://2.bp.blogspot.com/_JKET801YrSA/TGJOTRR8ZhI/AAAAAAAAAB4/6KUImWTa4XE/s1600/Kuya-Kim-2.JPG';
        }
        return `${cast.profile_path}`;
    };

    return (
        <div className="container">
            <div className="rowClass rowMovieDetails"  style={{ backgroundImage: `url(${movie.backdrop_path})` }}>
                <div className="col">
                <h1>{movie.original_title}</h1>
                <p className="overview">{movie.overview}</p>
                <p className="rating">
                    <img src="http://localhost:5173/star.svg" alt="rating"/> {movie.vote_average}
                    <b>VoteCount:</b> {movie.vote_count} | <b>Release Date:</b> {movie.release_date}
                </p>
                <p className="like">
                                        <img src="http://localhost:5173/like.svg" alt="likes"/> {movie.vote_count}
                                    </p>
                </div>
            </div>
            <div className="rowClass">
                <h2>Cast</h2>
            </div>
            <div className="rowClass">
                <div className="castCol">
                {movie.casts.map(cast => (
                    <div key={cast.id}>
                      <img
                                src={fallBackImage(cast)}
                                alt={cast.name}
                                className="cast-image"
                            />
                        <p className="castname">Artist: {cast.name}</p>
                        <p className="castCharacter">Character: {cast.character}</p>
                        <p className="classPopularity">Popularity: {cast.popularity}</p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default MovieDetails;
