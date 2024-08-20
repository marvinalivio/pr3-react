import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../useContext/useContext'
import { doSignOut } from '../firebase/auth'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = Context();
    return (
        <header>
            <div className="container">
                <div className="rowClass flexClass rowHeader alignCenter">
                    <div className="logo"><a href="/userDetails"><img src="http://localhost:5173/flix10_logo.png" alt="flix10" /></a></div>
                    <div className="login">
                    
                    {
                userLoggedIn
                    ?
                    <>
                        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-sm text-blue-600 underline'>Logout</button>
                    </>
                    :
                    <>
                        <Link className='btnLink' to={'/login'}>Login</Link>
                        <Link className='btnLink' to={'/register'}>Join Us</Link>
                    </>
            }

                        </div>
                </div>
            </div>
        </header>
    )
}
export default Header;


// const Header = () => {
//     return (
//         <header>
//             <div className="container">
//                 <div className="rowClass flexClass rowHeader alignCenter">
//                     <div className="logo"><a href="/"><img src="http://localhost:5173/flix10_logo.png" alt="flix10" /></a></div>
//                     <div className="login"><button>Join us</button><button>Login</button></div>
//                 </div>
//             </div>
//         </header>
//     )
// }
// export default Header;