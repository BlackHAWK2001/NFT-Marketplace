


import s from "./OneItem.module.scss"
import nft from "../../assets/oneItemNft.jpg"
// import avatar from "../../assets/avatar.png"
import ownerAvatarDec from "../../assets/ownerAvatarDecoration.svg"
import React, { useEffect, useState } from "react";
import { ETH_PRICE_API } from "../../store/api/cryptoApi";
import { setCategory } from '../../store/peopleCategorySlice/peopleCategorySlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { INft } from '../../types/NFT'
import closeIcon from "../../assets/closeIcon.svg"
import share from "../../assets/share.svg"
import editIcon from '../../assets/editIcon.svg'
import more from "../../assets/more.svg"
import addIcon from '../../assets/addIcon.svg'
import heart from "../../assets/heart.svg"
import { useAuth } from "../../context/authContenxt";
import { useFavorites } from "../../context/favorites";
import redHert from '../../assets/red-heart.png'
import binIcon from '../../assets/bin.svg'
import { useInfo } from "../../context/UserInfo";
import { useNft } from "../../context/nftContext";
import ModalBid from "../../components/modalBid/modalBid";
import ModalAuction from "../../components/ModalAuction/ModalAuction";
import ModalToken from "../../components/ModalToken/ModalToken";
import ModalFollowSteps from "../../components/modalFollowSteps/ModalFollowSteps";


const OneItem = () => {
    const { id } = useParams();
    const [nftData, setNft] = useState<INft | null>(null);
    const [ethPrice, setEthPrice] = useState<number | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const dispatch = useDispatch();
    const { activeCategory, data } = useSelector((state) => state.people);
    const { token } = useAuth();
    const { addFavorite, getFavorites, removeFavorite } = useFavorites();
    const navigate = useNavigate();
    const { avatar, username, userId } = useInfo();
    const currentBid = localStorage.getItem("newBidPrice")
const bidder = localStorage.getItem("bidder")
console.log(
    bidder
)
console.log(userId)
console.log(username)
    const { isOpenModalAuction, setIsOpenModalAuction, fetchGetNftAuction, price, _id, auctionEndTime,  isOpenBidAuction,
        setIsOpenBidAuction, isOpenBuyModal, setIsOpenBuyModal, fetchGetNftData } = useNft();


    
    const nft = _id;
    const startingPrice = price
    const endTime = auctionEndTime

    useEffect(() => {
        const fetchNftDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/api/v1/nfts/${id}`);
                console.log(response.data.data)
                setNft(response.data.data);
            } catch (error) {
                console.error("Error fetching NFT detail:", error);
            }
        };

        if (id) {
            fetchNftDetail();
        }
    }, [id]);


    useEffect(() => {
        const favoritesImage = getFavorites();
        setIsFavorite(favoritesImage.some(fav => fav._id === id)); //  id  useParams()
    }, [id, getFavorites]); // id


    const handleClick = async () => {
        if (!token) {
            navigate("/register");
            return;
        }

        try {
            if (isFavorite) {
                
                const response = await axios.post(
                    `http://localhost:5555/api/v1/nfts/${id}/unlike`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.status === 200 && id) {
                    removeFavorite(id);
                }


                setNft(response.data.data); //  NFT
            } else {
                
                const response = await axios.post(
                    `http://localhost:5555/api/v1/nfts/${id}/like`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (response.status === 200) {
                    addFavorite(response.data);
                }
            }
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };


    const handleDeleteNft = async () => {
        if (!token) {
            alert("You don't have a token");
            return;
        }

        if (!id) {
            console.error("NFT ID not found");
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:5555/api/v1/nfts/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                removeFavorite(id);
                navigate("/profile")
            }

            setNft(response.data.data); 
        } catch (error) {
            console.error("Error deleting NFT:", error);
        }
    }








    const filteredDataByCategory = data.filter(
        (item) => item.category === activeCategory && item.assignment === 'Owner'
    );

    const creatorsData = data.filter((item) => item.assignment === 'Creator');

    const handleCategoryClick = (category) => {
        dispatch(setCategory(category));
    };

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch(ETH_PRICE_API);
                const data = await response.json();
                setEthPrice(data.ethereum.usd);
            } catch (error) {
                console.error("Amends for the reduced ETH rate:", error);
            }
        };

        fetchPrice();
    }, []);

    const calculateValue = (ethAmount: number) => {
        return ethPrice !== null ? (ethAmount * ethPrice).toFixed(2) : "-";
    };

    const handleAddBid = () => {
        if (!token) {
            alert("You have not token")
        }

        try {
            setIsOpenBidAuction(true)
        } catch (e) {
            alert(e)
        }
    }

    const handleBuyNft = () => {
        if (!token) {
            alert("Ypu have not token")
        }
        try {
            setIsOpenBuyModal(true)
        } catch (e) {
            alert(e)
        }
    }


    return (
        <section className={`${s.oneItem} ${s.container}`}>
            <img src={nftData?.image} alt={nftData?.name} className={s.oneItem__image} />

            <div className={s.oneItem__info}>
                <h1>{nftData?.name}</h1>
                <div className={s.pricesAndStock}>
                    <div className={s.discover__card__price}>{nftData?.price} BTC</div>
                    <div className={s.discover__card__price_dark}>${calculateValue(2.5)}</div>
                    <div className={s.pricesAndStock__inStock}>10 in stock</div>
                </div>

                <div className={s.oneItem__desc}>
                    This NFT Card will give you Access to Special Airdrops. To learn more about UI8 please visit <br />
                    <a className={s.oneItem__desc__link} target="_blank" href="https://ui8.net">https://ui8.net</a>
                </div>

                <div className={s.peopleFilter}>
                    <div className={s.catogories}>
                        {['Info', 'Owners', 'History', 'Bids'].map((category) => (
                            <div
                                key={category}
                                className={`${s.category} ${activeCategory === category ? s.active : ''}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </div>
                        ))}
                    </div>

                    <div className={s.filterResult}>
                        {filteredDataByCategory.map((item) => (
                            <div key={item.id} className={s.filterResult__item}>
                                <div className={s.avatarWrapper}>
                                    <img src={avatar} alt="Avatar" className={s.avatar} />
                                </div>
                                <div className={s.peopleInfo}>
                                    <div className={s.assignment}>{item.assignment}</div>
                                    <div className={s.name}>{item.name}</div>
                                </div>
                            </div>
                        ))}

                        <div className={s.creatorSection}>
                            {creatorsData.map((item) => (
                                <div key={item.id} className={s.filterResult__item}>
                                    <div className={s.avatarWrapper}>
                                        <img src={avatar} alt="Avatar" className={s.avatar} />
                                    </div>
                                    <div className={s.peopleInfo}>
                                        <div className={s.assignment}>{item.assignment}</div>
                                        <div className={s.name}>{item.name}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={s.highestBid}>
                    <div className={s.highestBid__head}>
                        <img src={avatar} alt="" />
                        <div className={s.bidInfo}>
                            <div className={s.bidInfo__head}>
                                Highest bid by <span className={s.name}>{username && userId === bidder ? username : "lalala"}
                                </span>
                            </div>
                            <div className={s.bidInfo__price}>
                                <span className={s.ethereum}>{currentBid} BTC</span> ${calculateValue(1.46)}
                            </div>
                        </div>
                    </div>

                    <div className={s.highestBid__buttons}>
                        <button className={s.button_blue} onClick={handleBuyNft}>Purchase now</button>
                        <button className={s.button_dark} onClick={handleAddBid} type="button">Place a bid</button>
                    </div>

                    <div className={s.highestBid__bottom}>
                        <span>Service fee</span>
                        <span className={s.whiteText}>1.5%</span>
                        <span>2.563 ETH</span>
                        <span>${calculateValue(2.563)}</span>
                    </div>
                </div>
            </div>

            <div className={s.buttons}>

                <button className={s.buttons__button} onClick={() => id && fetchGetNftAuction(id)} >
                    <img src={addIcon} alt="" className={s.addBudAuction} />
                </button>
                <button className={s.buttons__button} onClick={handleDeleteNft}>
                    <img src={binIcon} alt="" className={s.deleteIcon} />
                </button>
                <button className={s.buttons__button} onClick={handleClick}>
                    <img src={isFavorite ? redHert : heart} alt="" />
                </button>
                <button className={s.buttons__button} onClick={() => id && fetchGetNftData(id)}>
                    <img src={editIcon} alt="" className={s.editIcon} />
                </button>
            </div>

            {isOpenModalAuction && (
                <ModalAuction isOpen={isOpenModalAuction} onClose={() => setIsOpenModalAuction(false)} nft={nft} startingPrice={startingPrice} endTime={endTime} />
            )}
            {isOpenBidAuction && (
                <ModalBid isOpenBidAuction={isOpenBidAuction} onClose={() => setIsOpenBidAuction(false)} startingPrice={startingPrice} />
            )}
            {isOpenBuyModal && (
                <ModalToken isOpenBuyModal={isOpenBuyModal} onClose={() => setIsOpenBuyModal(false)} />
            )}
        </section>
    );
};

export default OneItem;


