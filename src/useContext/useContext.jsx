import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios"; // Import axios
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const Context = () => {
  return useContext(AuthContext);
}

export const UserProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [movieData, setMovieData] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, []);

    const logout = () => {
        setCurrentUser(null);
        setData([]);
    }

    const initializeUser = async (user) => {
        if (user) {
            setCurrentUser({ ...user });
            const isEmail = user.providerData.some(
                (provider) => provider.providerId === "password"
              );
              setIsEmailUser(isEmail);
            setUserLoggedIn(true);
        }
        else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        axios.get('https://jsonfakery.com/movies/infinite-scroll')
            .then(response => {
                console.log('Response:', response); // Log the full response
                console.log('Data:', response.data); // Log the data part of the response
                const fetchedData = response.data.data || [];
                setData(fetchedData);
                setMovieData(fetchedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
console.log('moviedata', movieData);
    const initialValue = {
        data,
        setData,
        movieData,
        setMovieData,
        currentUser, 
        setCurrentUser,
        userLoggedIn, 
        setUserLoggedIn
    };

    return (
        <AuthContext.Provider value={initialValue}>
            {children}
        </AuthContext.Provider>
    );
};



// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios"; // Import axios

// export const Context = createContext();

// export const UserProvider = ({ children }) => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [movieData, setMovieData] = useState([]);

//     useEffect(() => {
//         axios.get('https://jsonfakery.com/movies/infinite-scroll')
//             .then(response => {
//                 console.log('Response:', response); // Log the full response
//                 console.log('Data:', response.data); // Log the data part of the response
//                 const fetchedData = response.data.data || [];
//                 setData(fetchedData);
//                 setMovieData(fetchedData);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching movies:', error);
//                 setError(error);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;
// console.log('moviedata', movieData);
//     const initialValue = {
//         data,
//         setData,
//         movieData,
//         setMovieData
//     };

//     return (
//         <Context.Provider value={initialValue}>
//             {children}
//         </Context.Provider>
//     );
// };
