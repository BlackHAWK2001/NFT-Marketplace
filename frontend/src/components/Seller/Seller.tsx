import s from './Seller.module.scss'
import arrowDown from '../../assets/arrow-down.png';
import cup from '../../assets/cup.svg';
import arrow from '../../assets/arrow.svg';
import avatar from "../../assets/avatar.png";
import ownerAvatarDec from "../../assets/ownerAvatarDecoration.svg"
import plus from "../../assets/plus-icon.svg"

const Seller = () => {
    return (
        <section className={s.sellerСontainer}>
            <div className={s.container}>
                <div className={s.sellerTop}>
                    <div className={s.sellerLeft}>
                        <div className={s.sellerLeftBlock}>
                            <span className={s.popular}>
                                Popular
                            </span>
                            <p className={s.sellers}>
                                Sellers
                                <img src={arrowDown} alt=""/>
                            </p>
                        </div>
                    </div>
                    <div className={s.sellerRight}>
                        <div className={s.rightBlock}>
                            <div className={s.timeFrame}>
                                TIMEFRAME
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.sellerContent}>
                    <div className={s.sellerCard}>
                        <div className={s.cardHead}>
                            <div className={s.cardBadge}>
                                <img src={cup} alt=""/>
                                #1
                            </div>
                            <div className={s.cardHead__icons}>
                                <img src={plus} alt=""/>
                                <img src={arrow} alt=""/>
                            </div>
                        </div>
                        <div className={s.filterResult__item}>
                            <div className={s.avatarWrapper}>
                                <img src={avatar} alt="Avatar" className={s.avatar}/>
                                <img src={ownerAvatarDec} alt="" className={s.assignment}/>
                            </div>
                            <div className={s.peopleInfo}>
                                <div className={s.name}>Payton Harris</div>
                                <div className={s.amountOfEthereum}>2.456 <span>ETH</span></div>
                            </div>
                        </div>
                    </div>
                    <div className={s.sellerCard}>
                        <div className={s.cardHead}>
                            <div className={s.cardBadge}>
                                <img src={cup} alt=""/>
                                #1
                            </div>
                            <div className={s.cardHead__icons}>
                                <img src={plus} alt=""/>
                                <img src={arrow} alt=""/>
                            </div>
                        </div>
                        <div className={s.filterResult__item}>
                            <div className={s.avatarWrapper}>
                                <img src={avatar} alt="Avatar" className={s.avatar}/>
                                <img src={ownerAvatarDec} alt="" className={s.assignment}/>
                            </div>
                            <div className={s.peopleInfo}>
                                <div className={s.name}>Payton Harris</div>
                                <div className={s.amountOfEthereum}>2.456 <span>ETH</span></div>
                            </div>
                        </div>
                    </div>
                    <div className={s.sellerCard}>
                        <div className={s.cardHead}>
                            <div className={s.cardBadge}>
                                <img src={cup} alt=""/>
                                #1
                            </div>
                            <div className={s.cardHead__icons}>
                                <img src={plus} alt=""/>
                                <img src={arrow} alt=""/>
                            </div>
                        </div>
                        <div className={s.filterResult__item}>
                            <div className={s.avatarWrapper}>
                                <img src={avatar} alt="Avatar" className={s.avatar}/>
                                <img src={ownerAvatarDec} alt="" className={s.assignment}/>
                            </div>
                            <div className={s.peopleInfo}>
                                <div className={s.name}>Payton Harris</div>
                                <div className={s.amountOfEthereum}>2.456 <span>ETH</span></div>
                            </div>
                        </div>
                    </div>
                    <div className={s.sellerCard}>
                        <div className={s.cardHead}>
                            <div className={s.cardBadge}>
                                <img src={cup} alt=""/>
                                #1
                            </div>
                            <div className={s.cardHead__icons}>
                                <img src={plus} alt=""/>
                                <img src={arrow} alt=""/>
                            </div>
                        </div>
                        <div className={s.filterResult__item}>
                            <div className={s.avatarWrapper}>
                                <img src={avatar} alt="Avatar" className={s.avatar}/>
                                <img src={ownerAvatarDec} alt="" className={s.assignment}/>
                            </div>
                            <div className={s.peopleInfo}>
                                <div className={s.name}>Payton Harris</div>
                                <div className={s.amountOfEthereum}>2.456 <span>ETH</span></div>
                            </div>
                        </div>
                    </div>
                    <div className={s.sellerCard}>
                        <div className={s.cardHead}>
                            <div className={s.cardBadge}>
                                <img src={cup} alt=""/>
                                #1
                            </div>
                            <div className={s.cardHead__icons}>
                                <img src={plus} alt=""/>
                                <img src={arrow} alt=""/>
                            </div>
                        </div>
                        <div className={s.filterResult__item}>
                            <div className={s.avatarWrapper}>
                                <img src={avatar} alt="Avatar" className={s.avatar}/>
                                <img src={ownerAvatarDec} alt="" className={s.assignment}/>
                            </div>
                            <div className={s.peopleInfo}>
                                <div className={s.name}>Payton Harris</div>
                                <div className={s.amountOfEthereum}>2.456 <span>ETH</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Seller
