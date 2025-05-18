import s from './Crypter.module.scss';
import crypterImage from '../../assets/crypter.png'
import { Link } from "react-router";

const Crypter = () => {
    return (
        <section className={s.crypter}>
            <div className={s.container}>
                <div className={s.crypterContent}>
                    <div className={s.crypterLeft}>
                        <p className={s.crypterHeaderTitle}>Save your time with Stacks</p>
                        <h2 className={s.crypterTitle}>Earn free crypto with Our Market</h2>
                        <p className={s.crypterSubtitle}>A creative agency that lead and inspire</p>
                        <div className={s.crypterButtons}>
                            <button type='button' className={s.crypterButtonEarn}>
                                Earn now
                            </button>
                            <Link to="/discover" type='button' className={s.crypterButtonDiscover}>
                                Discover more
                            </Link>
                        </div>
                    </div>
                    <div className={s.crypterRight}>
                        <img src={crypterImage} alt="Crypto Image" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Crypter
