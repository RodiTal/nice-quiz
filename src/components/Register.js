import { useRef, useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const RegisterWithNavigate =  () => {
    const navigate = useNavigate();
    return <Register navigate =  { navigate }/>
}



const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_ ]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Validate username
    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    // Validate password
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatchPwd(pwd === matchPwd);
    }, [pwd, matchPwd]);

    // Clear error message when user changes input
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Re-validate before submission
        const validUser = USER_REGEX.test(user);
        const validPassword = PWD_REGEX.test(pwd);

        if (!validUser || !validPassword) {
            setErrMsg('Invalid Entry');
            return;
        }
        setSuccess(true);
    };

    return (
        <section>
            {success ? (
                <h1>Registration Successful!</h1>
            ) : (
                <form onSubmit={handleSubmit}>
                    <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
                        {errMsg}
                    </p>

                    {/* Username */}
                    <label htmlFor="username">
                        Username:
                        <span className={validName ? 'valid' : 'hide'}>
                            <FaCheck />
                        </span>
                        <span className={validName || !user ? 'hide' : 'invalid'}>
                            <FaTimes />
                        </span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={!validName ? 'true' : 'false'}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p
                        id="uidnote"
                        className={userFocus && user && !validName ? 'instructions' : 'offscreen'}
                    >
                        <FaInfoCircle />
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    {/* Password */}
                    <label htmlFor="password">
                        Password:
                        <span className={validPwd ? 'valid' : 'hide'}>
                            <FaCheck />
                        </span>
                        <span className={validPwd || !pwd ? 'hide' : 'invalid'}>
                            <FaTimes />
                        </span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={!validPwd ? 'true' : 'false'}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p
                        id="pwdnote"
                        className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
                    >
                        <FaInfoCircle />
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number, and a special character.<br />
                        Allowed special characters: ! @ # $ % ^ & *.
                    </p>

                    {/* Confirm Password */}
                    <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <span className={validMatchPwd && matchPwd ? 'valid' : 'hide'}>
                            <FaCheck />
                        </span>
                        <span className={validMatchPwd || !matchPwd ? 'hide' : 'invalid'}>
                            <FaTimes />
                        </span>
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={!validMatchPwd ? 'true' : 'false'}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchPwdFocus(true)}
                        onBlur={() => setMatchPwdFocus(false)}
                    />
                    <p
                        id="confirmnote"
                        className={matchPwdFocus && !validMatchPwd ? 'instructions' : 'offscreen'}
                    >
                        <FaInfoCircle />
                        Must match the first password input field.
                    </p>

                    <button
                        type="submit"
                        disabled={!validName || !validPwd || !validMatchPwd}
                    >
                        Sign Up
                    </button>
                </form>
            )}
        </section>
    );
};

export default RegisterWithNavigate;
