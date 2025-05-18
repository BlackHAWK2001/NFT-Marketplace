import s from "./ModalSuccessfully.module.scss"
import closeIcon from '../../assets/cancel.png'
import facebook from '../../assets/facebook.svg'
import twitter from '../../assets/twitter.svg'
import instagram from '../../assets/Instagram.svg'
import pinterest from '../../assets/pinterest.svg'

const ModalSuccessfully = () => {
    return (
        <section className={s.modal}>
            <div className={s.overlay}></div>

            <div className={s.modalWrapper}>
                <img src={closeIcon} alt="" className={s.closeIcon} />
                <div className={s.gapWrapper}>
                    <h1>Yay! 🎉</h1>
                    <div className={s.modal__subtitle}>
                        You successfully purchased <br />
                        C O I N Z from UI8
                    </div>
                    <div className={s.modal__content}>
                        <div className={s.modal__content__left}>
                            <div className={`${s.modal__content__left_status}
                         ${s.rowItem}`}>
                                Status
                            </div>
                            <div className={`${s.modal__content__left_processing} 
                        ${s.rowItem}`}>
                                Processing
                            </div>
                        </div>
                        <div className={s.modal__content__right}>
                            <div className={`${s.modal__content__right_transaction} 
                        ${s.rowItem}`}>
                                Transaction ID
                            </div>
                            <div className={`${s.modal__content__right_wallet} 
                        ${s.rowItem}`}>
                                0msx836930...87r398
                            </div>
                        </div>
                    </div>
                    <div className={s.modal__socialsBlock}>
                        Time to show-off
                        <div className={s.modal__socials}>
                            <div className={s.modal__socials__social}>
                                <img src={facebook} alt="" className={s.modal__socials__social_img} />
                            </div>
                            <div className={s.modal__socials__social}>
                                <img src={twitter} alt="" className={s.modal__socials__social_img} />
                            </div>
                            <div className={s.modal__socials__social}>
                                <img src={instagram} alt="" className={s.modal__socials__social_img} />
                            </div>
                            <div className={s.modal__socials__social}>
                                <img src={pinterest} alt="" className={s.modal__socials__social_img} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ModalSuccessfully