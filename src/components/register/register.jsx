import { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Context } from "../../useContext/useContext";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";

const Register = () => {
    const navigate = useNavigate();  // Changed to lowercase 'navigate'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');  // Fixed the typo here
    const [isRegistering, setIsRegistering] = useState(false);  // Added missing state for 'isRegistering'
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = Context();  // Use useContext to access the context

    const onSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                navigate('/home');
            } catch (error) {
                setErrorMessage(error.message);
                setIsRegistering(false);
            }
        }
    };

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="">
                <div className="">
                    <div className="">
                        <div className="mt-2">
                            <h3 className="">Create a New Account</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="">
                        <div>
                            <label className="">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className=""
                            />
                        </div>

                        <div>
                            <label className="">
                                Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=""
                            />
                        </div>

                        <div>
                            <label className="">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className=""
                            />
                        </div>

                        {errorMessage && (
                            <span className=''>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`${isRegistering ? 'registered' : 'fail'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-sm text-center">
                            Already have an account? {' '}
                            <Link to={'/login'} className="">Continue</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Register;
