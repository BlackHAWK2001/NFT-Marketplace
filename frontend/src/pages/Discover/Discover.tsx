import React, { useEffect, useState } from "react";
import s from "./Discover.module.scss";
import search from "../../assets/search-white.svg";
import close from "../../assets/close.svg"
import nft from "../../assets/nft-image.png"
import avatar from "../../assets/avatar.png"
import line from "../../assets/line.svg"
import axios from 'axios'
import { INft } from '../../types/NFT'
import { Link } from 'react-router-dom';

interface INftsResponse {
    data: INft[];
}

const Discover = () => {
    const [price, setPrice] = useState(5);
    const [allData, setAllData] = useState<INft[]>([]);

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(event.target.value));
    };

    useEffect(() => {
        const fetchItemsSale = async () => {
            try {
                const response = await axios.get<INftsResponse>(
                    "http://localhost:5555/api/v1/nfts"
                );
                console.log("Data received:", response.data.data);
                setAllData(response.data.data)
            } catch (error) {
                console.error("Request Error:", error);
            }
        };

        fetchItemsSale();
    }, []);

    return (
        <section className={s.discover}>
            <div className={s.container}>
                <form className={s.yourKeywords}>
                    <button type="submit" className={s.yourKeywords__searchButton}>
                        <img src={search} alt="search icon" />
                    </button>

                    <input
                        type="text"
                        className={s.yourKeywords__input}
                        placeholder="Type your keywords"
                    />
                </form>

                <div className={s.content}>
                    <div className={s.content__head}>
                        <ul className={s.content__head__navigation}>
                            <li>
                                <a href="#">All items</a>
                            </li>
                            <li>
                                <a href="#">Art</a>
                            </li>
                            <li>
                                <a href="#">Game</a>
                            </li>
                            <li>
                                <a href="#">Photography</a>
                            </li>
                            <li>
                                <a href="#">Music</a>
                            </li>
                            <li>
                                <a href="#">Video</a>
                            </li>
                        </ul>
                    </div>

                    <div className={s.discover__content}>
                        <div className={s.filter}>
                            <div className={s.filter__content}>
                                <div className={s.filter__price}>
                                    <div className={s.filter__price__title}>Price range</div>
                                    <div className={s.filter__range}>
                                        <input
                                            type="range"
                                            min="0.01"
                                            max="10"
                                            step="0.01"
                                            value={price}
                                            onChange={handlePriceChange}
                                        />
                                        <div className={s.filter__range__value}>{price} BTC</div>
                                    </div>
                                    <div className={s.filter__range__labels}>
                                        <span>0.01 BTC</span>
                                        <span>10 BTC</span>
                                    </div>
                                </div>

                                <div className={s.filter__likes}>
                                    likes
                                </div>

                                <div className={s.filter__colors}>
                                    open
                                </div>

                                <div className={s.filter__creator}>
                                    creator
                                </div>
                            </div>

                            <div className={s.filter__reset}>
                                <img src={close} alt="" />
                                Reset filter
                            </div>
                        </div>


                        <div className={s.discover__cards}>
                            {allData.length > 0 ? (
                                allData.map((nft) => (
                                    <Link to={`/nft/${nft._id}`} key={nft._id} className={s.discover__card}>
                                        <img src={nft.image} alt={nft.name} className={s.nftImage} />
                                        <div className={s.discover__card__infoWrapper}>
                                            <div>{nft.name}</div>
                                            <div className={s.discover__card__price}>{nft.price} ETH</div>
                                        </div>

                                        <div className={s.discover__card__inStock}>
                                            <div className={s.discover__card__avatars}>
                                                <img src={avatar} alt="avatar" />
                                                <img src={avatar} alt="avatar" />
                                                <img src={avatar} alt="avatar" />
                                            </div>

                                            <div className={s.discover__card__amountInStock}>
                                                in stock 
                                            </div>
                                        </div>

                                        <div className={s.discover__card__bid}>
                                            <img src={line} alt="line" />
                                            <div>Highest bid</div>
                                            <div className={s.price}>0.0001 ETH</div>
                                            <div>New bid 🔥</div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>No NFTs available</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Discover;
