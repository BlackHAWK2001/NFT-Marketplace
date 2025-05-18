import s from './onSale.module.scss'
import candlesticks from '../../assets/candlesticks.png'
import { useAuth } from '../../context/authContenxt'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { INft } from '../../types/NFT'
import { Link } from 'react-router'
import { useInfo } from '../../context/UserInfo'

interface INftsResponse {
    data: INft[];
}

const OnSale = () => {
    const { token } = useAuth();
    const {userId} = useInfo();
    const [saleData, setSaleData] = useState<INft[] | null>([]);

    useEffect(() => {
        const fetchItemsSale = async () => {
        
            if (!token) {
                alert("No token, please login or register");
                return;
            }

            try {
                const response = await axios.get<INftsResponse>("http://localhost:5555/api/v1/nfts", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const createdNfts = response.data?.data?.filter(nft => nft.creator === userId);
                console.log(createdNfts)
                console.log("NFTs owned by the user:", createdNfts);
                setSaleData(createdNfts);
                console.log('Profile data:', response.data);
            } catch (e) {
                console.error("NFT loading error:", e);
            }
        };

        fetchItemsSale();
    }, [token, localStorage.getItem("userId")]); 

    return (
        <section className={s.onSale}>
            {saleData && saleData.length > 0 ? (
                saleData.map((nft) => (
                    <Link to={`/nft/${nft._id}`} >
                        <div key={nft._id} className={s.tabBlock}>
                            <img src={nft.image} alt={nft.name} className={s.nftImg} />
                            <div className={s.nftInfo}>
                                <div className={s.infoTop}>
                                    <p className={s.nftTitle}>{nft.name}</p> 
                                    <p className={s.nftPrice}>{nft.price} BTC</p> 
                                </div>
                                <span className={s.nftInfoLine}></span>
                                <div className={s.infoBottom}>
                                    <img src={candlesticks} alt="candlesticks-image" />
                                    <p className={s.bottomTitle}>
                                        Highest bid <span className={s.bottomPRoce}>0.001 BTC</span>
                                    </p>
                                    <p className={s.bottomNewBild}>New bid 🔥</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            ) : (
                <p className={s.noItem}>No items on sale</p>
            )}
        </section>
    );
};

export default OnSale;