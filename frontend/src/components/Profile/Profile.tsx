import s from './Profile.module.scss';
import coins from '../../assets/coins.svg';
import globeIcon from '../../assets/globe.svg';
import facebookIcon from '../../assets/facebook.svg';
import twitterIcon from '../../assets/twitter.svg';
import instagramIcon from '../../assets/Instagram.svg';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IProfile } from '../../types/profileType';
import { useAuth } from '../../context/authContenxt';
import { useInfo } from '../../context/UserInfo';

const Profile = () => {
  const { username, email } = useInfo();
  const { token } = useAuth(); 
  const [profileData, setProfileData] = useState<IProfile | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/profile") {
      navigate("/profile/on-sale", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        console.error('No token found!');
        return;
      }

      try {
        const response = await axios.get<IProfile>(
          "http://localhost:5555/api/v1/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log('Profile data:', response.data);
        setProfileData(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.data);
          console.error("Status code:", error.response?.status);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchProfile();
  }, [token, username]);


  return (
    <section className={s.container}>
      <div className={s.profile}>
        <aside className={s.aside}>
          <div className={s.profileBlock}>
            <img src={profileData?.profileImage} alt="User" className={s.profileUserLogo} />

            <div className={s.profileBlockInfo}>
              <h2 className={s.profileName}>{username}</h2>
              <div className={s.profileQrcode}>
                <p className={s.qrcode}>{email}</p>
                <img src={coins} alt="Coins" className={s.profileQrcodeImage} />
              </div>
              <p className={s.profileUserDescription}>Description here</p>
              <div className={s.profileLink}>
                <img src={globeIcon} alt="Website" className={s.socilalLinkImage} />
                <Link to="https://ui8.net" className={s.socilalLink}>https://ui8.net</Link>
              </div>
            </div>

            <button className={s.profileFollowButton}>Follow</button>

            <div className={s.socilalLinks}>
              <img src={twitterIcon} alt="Twitter" className={s.socialImage} />
              <img src={instagramIcon} alt="Instagram" className={s.socialImage} />
              <img src={facebookIcon} alt="Facebook" className={s.socialImage} />
            </div>

            <span className={s.profileLine}></span>
            <p className={s.profileDate}>Member since {profileData?.dateJoined || "Unknown"}</p>
          </div>
        </aside>

        <div className={s.content}>
          <div className={s.tabs}>
            <NavLink to="/profile/created" className={({ isActive }) => isActive ? `${s.tabsButton} ${s.active}` : s.tabsButton}>
              Created
            </NavLink>
            <NavLink to="/profile/favorites" className={({ isActive }) => isActive ? `${s.tabsButton} ${s.active}` : s.tabsButton}>
              Favorites
            </NavLink>
            <NavLink to="/following" className={({ isActive }) => isActive ? `${s.tabsButton} ${s.active}` : s.tabsButton}>
              Following
            </NavLink>
            <NavLink to="/followers" className={({ isActive }) => isActive ? `${s.tabsButton} ${s.active}` : s.tabsButton}>
              Followers
            </NavLink>
                 <NavLink to="/profile/collectibles" className={({ isActive }) => isActive ? `${s.tabsButton} ${s.active}` : s.tabsButton}>
              Collectibles
            </NavLink>
          </div>

          <div className={s.tabsResult}>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

