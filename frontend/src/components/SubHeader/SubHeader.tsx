import imageIcon from '../../assets/image.svg'
import pencilIcon from '../../assets/pencil.svg'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, } from '../../store/authSlice/authSlice';
import s from './SubHeader.module.scss';
import { useLogoutFormMutation } from '../../store/api/authApi';

const SubHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logoutForm] = useLogoutFormMutation();


const logoutFunction = async () => {
    try {
        await logoutForm().unwrap();
        dispatch(logout());
        alert("Logged out of account successfully");
        window.location.reload();  // <<< force full reload here
        // navigate('/') // no need to navigate since page reloads
    } catch (e) {
        console.error("Logout failed", e);
        alert("Logout request failed");
    }
}


    // const logoutFunction = async () => {
    //     try {
    //         await logoutForm().unwrap();
    //         dispatch(logout());
    //         navigate('/')
    //         alert("Logged out of account successfully")
    //     } catch (e) {
    //         console.error("Logout failed", e);
    //         alert("Logout request failed");
    //     }
    // }

    return (
        <section className={s.subHeader}>
            <div className={s.container}>
                <div className={s.subHeaderLinks}>
                    <Link to='/edit'>
                        <div className={s.subHeaderButton}>
                            Edit cover photo
                            <img src={imageIcon} alt="" className={s.subHeaderImage} />
                        </div>
                    </Link>
                    <Link to='/editProfile'>
                        <div className={s.subHeaderButton}>
                            Edit profile
                            <img src={pencilIcon} alt="" className={s.subHeaderImage} />
                        </div>
                    </Link>
                    <button
                        type='button'
                        className={s.subHeaderButton}
                        onClick={logoutFunction}
                    >
                        logout
                    </button>
                </div>
            </div>
        </section>
    )
}

export default SubHeader
