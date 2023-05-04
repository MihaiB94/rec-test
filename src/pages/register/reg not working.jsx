import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

export default function Register() {
   const [data, setData] = useState({
      username: '',

      email: '',
      password: ''
   });
   const [error, setError] = useState('');
   const navigate = useNavigate();

   // const [username, setUsername] = useState('');
   // const [email, setEmail] = useState('');
   // const [password, setPassword] = useState('');
   // const [error, setError] = useState(false);

   const handleChange = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const url = '/authentication/register';
         const { data: res } = await axios.post(url, data);
         navigate('/login');
         console.log(res.message);
      } catch (error) {
         if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
         ) {
            setError(error.response.data.message);
         }
      }
   };

   // const handleSubmit = async (e) => {
   //    e.preventDefault();
   //    setError(false);
   //    try {
   //       const res = await axios.post("/authentication/register", {
   //          username,
   //          email,
   //          password
   //       });
   //       res.data && window.location.replace("/login");
   //    } catch (err) {
   //       setError(true);
   //    }
   // };

   return (
      <div className="register">
         <div className="register-container">
            <div className="register-box-wrapper">
               <div className="form-header">
                  <h1>Register Account</h1>
               </div>
               <div className="login-form-wrapper">
                  <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label className="register-label" htmlFor="username">
                           Username
                        </label>
                        <input
                           type="text"
                           id="username"
                           name="username"
                           required
                           onChange={handleChange}
                           value={data.username}
                        />
                     </div>

                     <div className="form-group">
                        <label className="register-label" htmlFor="email">
                           Email Address
                        </label>
                        <input
                           type="email"
                           id="email"
                           name="email"
                           required
                           onChange={handleChange}
                           value={data.email}
                        />
                     </div>

                     <div className="form-group">
                        <label className="register-label" htmlFor="password">
                           Password
                        </label>
                        <input
                           type="password"
                           id="password"
                           name="password"
                           required
                           onChange={handleChange}
                           value={data.password}
                        />
                     </div>
                     {/* <div className="form-group">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input
                           type="password"
                           id="cpassword"
                           name="cpassword"
                           required="required"
                           onChange={(e) => setcPassword(e.target.value)}
                        />
                     </div> */}

                     <div className="form-group">
                        <button className="register-btn" type="submit">
                           Register
                        </button>
                     </div>

                     <div className="acc-register">
                        <p> Already have an account?</p>
                        <Link className="link register-option" to="/login">
                           Login
                        </Link>
                     </div>
                     {error && (
                        <p className="register-error">
                           Username or email already in use! Try again
                        </p>
                     )}
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
