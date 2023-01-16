import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';






function SignUp() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [userInput, setUserInput] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (loading) {
            return;
        }
        const response = await validateUser(await getUser(userInput.username, userInput.password));
        console.log(response);
    };


    function handleChange({ target }) {
        const { name, value } = target;
        setUserInput((prevUser) => ({ ...prevUser, [name]: value }));
    }


    const getUser = async (username, password) => {
        setLoading(true);
        try {
            console.log(username, password);
            const res = await fetch(
                `http://localhost:8000/users/signup/${username}/${password}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!res.ok) throw new Error(res.message);

            const data = await res.json();
            setLoading(false);

            console.log(data);
            if (typeof data === 'string') {

                setErrorMessage('Please Check UserName or Password');
            }
            return data;
        } catch (e) {
            console.log('oh no!!!!')
            console.log(e);
            setTimeout(3000, alert("Please Check Your Internet Connection"));
            setTimeout(3000, window.location.reload());
        }
    };

    const validateUser = async (user) => {
        if (typeof user === 'string') {

            setErrorMessage("UserName Already exist");
            return;
        }

        localStorage.setItem("userId", user.id);
        // setUserNum(user.id);
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = window.history.go(1);
        navigate(`/LogIn`);
    };

    return (
        <div>
            <div className="login-wrapper">
                <div className="container main">
                    <div className="row">
                        <div className="col-md-6 signin-image">
                            <div className="text"></div>
                        </div>

                        <form
                            className={"col-md-6 right"}
                            onSubmit={handleSubmit}>
                            <div className="input-box">
                                <header>Sign UP</header>
                                <div className="input-field">
                                    <input
                                        type="text"
                                        name="username"
                                        className={loading === false ? "input" : "input wait"}
                                        id="username"
                                        onChange={handleChange}
                                        value={userInput.username}
                                        required
                                    />
                                    <label htmlFor="username">Username</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="password"
                                        name="password"
                                        className={loading === false ? "input" : "input wait"}
                                        id="password"
                                        onChange={handleChange}
                                        value={userInput.password}
                                        required
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        type="submit"
                                        className={loading === false ? "submit" : "loading"}
                                        value={loading === false ? "SignUp" : "Loading..."}
                                    />
                                </div>
                                <p id="response-text">{errorMessage}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;