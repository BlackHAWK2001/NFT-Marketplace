import s from './Auth.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {   setAuth, setUser } from '../../store/authSlice/authSlice'
import { SubmitHandler, useForm } from "react-hook-form"
import { FormData, IFormRegister } from '../../types/Form'
import { usePostFormRegisterMutation } from '../../store/api/authApi'
import { useNavigate } from 'react-router'


const Register = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm<FormData>();
    const navigate = useNavigate();
    const [postRegister] = usePostFormRegisterMutation();
    
    const onSubmit: SubmitHandler<IFormRegister> = async (data) => {
        try {
            console.log("Sending data:", data);
    
            const responseRegister = await postRegister({
                username: data.username,
                email: data.email,
                password: data.password,
                id: data.id,
                wallet: {
                    walletId: ''
                }
            }).unwrap();
    
            console.log("Response from the server:", responseRegister);
    
            if (responseRegister) {
                // const userId = responseRegister?.user?._id; // userId
                const walletId = responseRegister?.wallet?.walletId; //  walletId
    
                // if (userId) {
                //     localStorage.setItem("userId", userId);
                //     console.log("userId saved:", userId);
                // } 
                // else {
                //     console.warn("userId is missing from server response");
                // }
    
                if (walletId) {
                    localStorage.setItem("walletId", walletId);
                    console.log("walletId saved:", walletId);
                } else {
                    console.warn("walletId missing from server response");
                }
    
                dispatch(setAuth(true));
                dispatch(setUser({ 
                    username: data.username, 
                    email: data.email, 
                    password: data.password
                }));
    
                console.log("User registered:", responseRegister);
            } else {
                console.error("Registration error: empty response from server");
            }
    
            reset();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    
    
    const handleNavigate = () => {
        navigate("/login")
    }


    return (
        <section className={s.auth}>
            <div className={s.container}>
                <div className={s.authContent}>
                    <div className={s.authForm}>
                        <h2 className={s.authTitle}>
                            Register
                        </h2>



                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

                            <input
                                type="text"
                                className={s.authInput}
                                placeholder="Username"
                                {...register("username", { required: true })}
                                autoComplete="off"
                            />

                            <input
                                type="email"
                                className={s.authInput}
                                placeholder="Email"
                                {...register("email", { required: true })}
                                autoComplete="new-email"
                            />
                            <input
                                type="password"
                                className={s.authInput}
                                placeholder="Password"
                                {...register("password", { required: true })}
                                autoComplete="new-password"
                            />

                            <div className={s.authBtns}>

                                <button type="submit" className={s.authSubLinkBtn} onClick={handleNavigate}>
                                    Register
                                </button>


                            </div>
                        </form>



                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register
