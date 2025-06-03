import { useEffect, useState } from "react";
import "../css/login.css"
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function Login() {
    const navigate = useNavigate();

    const [name, setname] = useState("")
    const [gmail, setgmail] = useState("")
    const [pass, setpass] = useState("")
    const [login, setlogin] = useState([])

    const [isRegister, setIsRegister] = useState(false)
    const Url = isRegister ? 'http://localhost:5001/register' : 'http://localhost:5001/login'

    //change register & login
    const change = () => {
        setIsRegister(!isRegister);
        setlogin([])
    }

    useEffect(function () {
        axios.get('http://localhost:5001/loginlist').then(function (data) {
            setlogin(data.data)
        })
    }, [])

    function handlename(evt) {
        setname(evt.target.value)
    }
    function handlegmail(evt) {
        setgmail(evt.target.value)
    }
    function handlepass(evt) {
        setpass(evt.target.value)
    }

    function Register() {
        if ((isRegister && !name) || !gmail || !pass) {
            alert("Please fill all required fields.");
            return;
        }

        axios.post(Url, { name, gmail, pass })
            .then(function (response) {
                if (isRegister) {
                    if (response.data === "success") {
                        alert("Registration successful");
                        setname("");
                        setgmail("");
                        setpass("");


                    } else {
                        alert("Registration failed or user already exists");
                        setname("");
                        setgmail("");
                        setpass("");

                    }
                } else {
                    // Login response handling
                    if (response.data === "success") {
                        alert("Login successful");
                        navigate("/register_list");
                    } else if (response.data === "error") {
                        alert("Incorrect password");
                        setpass("");
                    } else if (response.data === "no record") {
                        alert("No user found with this email");
                        setgmail("");
                    } else {
                        alert("Unexpected response: " + response.data);
                        setgmail("");
                        setpass("");
                    }
                }
            })
            .catch(function (error) {
                console.error("Error during login/register:", error);
            });

        if (isRegister) {
            setlogin([...login, { name: name, gmail: gmail, pass: pass }]);
        }
    }


    return (
        <div>
            <div id="con">
                <div id="login">
                    <div id="sec-h1">
                        <h1>{isRegister ? 'Register' : 'Login'}</h1>
                    </div>
                    {isRegister && (<label>Name</label>)}
                    {isRegister && (<input type="text" value={name} onChange={handlename} placeholder="Name" required />)}
                    <label>Gmail</label>
                    <input type="text" value={gmail} onChange={handlegmail} placeholder="Gmail" required />
                    <label>Password</label>
                    <input type="text" value={pass} onChange={handlepass} placeholder="Password" required />
                    <div id="button">
                        <button onClick={Register}>{isRegister ? 'Register' : 'Login'}</button>
                    </div>
                    <div id="p-sec">
                        <p id="p-one">{isRegister ? 'Already have an account?' : "Don't have an account?"}<span id="p-two" onClick={change}>{isRegister ? 'Login' : 'Register'} </span> </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;