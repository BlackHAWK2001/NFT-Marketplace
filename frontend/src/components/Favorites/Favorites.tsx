import s from './Favorite.module.scss'
import candlesticks from '../../assets/candlesticks.png'
import { useFavorites } from '../../context/favorites'
import { Link } from 'react-router'

const Favorites = () => {
    const { getFavorites } = useFavorites();
    const favorites = getFavorites();
    const currentBid = localStorage.getItem("newBidPrice")

    return (
        <section className={s.onSale}>
            {favorites.length === 0 ? (
                <p>No favorites added yet.</p>
            ) : (
                favorites.map((favorite) => (
                    <Link to={`/nft/${favorite._id}`} >
                        <div key={favorite._id} className={s.tabBlock}>
                            <img src={favorite.image} alt={favorite.name} className={s.nftImg} />
                            <div className={s.nftInfo}>
                                <div className={s.infoTop}>
                                    <p className={s.nftTitle}>{favorite.name}</p> 
                                    <p className={s.nftPrice}>{favorite.price} BTC</p>
                                </div>
                                <span className={s.nftInfoLine}></span>
                                <div className={s.infoBottom}>
                                    <img src={candlesticks} alt="candlesticks-image" />
                                    <p className={s.bottomTitle}>
                                        Highest bid <span className={s.bottomPRoce}>{currentBid} BTC</span>
                                    </p>
                                    <p className={s.bottomNewBild}>New bid 🔥</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            )}

        </section>
    );
};

export default Favorites;