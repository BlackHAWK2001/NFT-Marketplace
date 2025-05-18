import s from './Auth.module.scss'
import { useDispatch,  } from 'react-redux'
import {  setAuth,  setToken } from '../../store/authSlice/authSlice'
import {  SubmitHandler, useForm } from "react-hook-form"

import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/authContenxt'
import { useInfo } from '../../context/UserInfo'

interface FormData {
    email: string;
    password: string;
  }
  
  const Login = () => {
    const [loading, setLoading] = useState(false);
    const { updateUsername, updateEmail} =useInfo();
    const { setToken } = useAuth(); 
    const navigate = useNavigate();
  
    const { register, handleSubmit } = useForm<FormData>();
  

    const onSubmitJHandler: SubmitHandler<FormData> = async (data) => {
      try {
          setLoading(true);
          console.log("Submitting the form:", data); 
  
          const response = await axios.post('http://localhost:5555/api/v1/auth/login', {
              email: data.email,
              password: data.password,
          });
  
          console.log("Response from the server:", response.data); 
  
          if (response.status === 200) {
            const userId = response.data?._id;

              console.log("userId:", userId);
              localStorage.setItem("userId", userId);
          }
  
          if (response.data.token) {
              setToken(response.data.token);
  
              try {
                  const profileResponse = await axios.get("http://localhost:5555/api/v1/auth/profile", {
                      headers: { Authorization: `Bearer ${response.data.token}` },
                  });
  
                  updateUsername(profileResponse.data.data.username);
                  updateEmail(profileResponse.data.data.email);
              } catch (error) {
                  console.error("Error loading profile after login:", error);
              }
  
              navigate('/profile');
          }
      } catch (error) {
          console.error('Error submitting form:', error);
  
          if (axios.isAxiosError(error)) {
              console.error("Axios error:", error.response?.data);
          }
      } finally {
          setLoading(false);
      }
  };


  
  return (
      <section className={s.auth}>
        <div className={s.container}>
          <div className={s.authContent}>
            <div className={s.authForm}>
              <h2 className={s.authTitle}>Login</h2>
              <form onSubmit={handleSubmit(onSubmitJHandler)} autoComplete="off">
                <input
                  type="email"
                  className={s.authInput}
                  placeholder="Email"
                  {...register('email', { required: 'Email is required' })}
                  autoComplete="new-email"
                />
                <input
                  type="password"
                  className={s.authInput}
                  placeholder="Password"
                  {...register('password', { required: 'Password is required' })}
                  autoComplete="new-password"
                />
                <div className={s.authBtns}>
                  <button type="submit" className={s.authSubLinkBtn} disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Login;