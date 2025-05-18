import { useEffect } from "react";
import s from "./modalFollowSteps.module.scss";
import closeIcon from "../../assets/cancel.png";
import infoError from "../../assets/infoError.svg";
import avatar from "../../assets/avatar.png";

const ModalFollowSteps = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden"; 

        return () => {
            document.body.style.overflow = "auto"; 
        };
    }, []);

    return (
        <section className={s.modal}>
            <div className={s.overlay}></div>

            <div className={s.modalWrapper}>
                <div className={s.modalWrapper__top}>
                    <h1 className={s.modalWrapper__top__title}>Follow steps</h1>
                    <img src={closeIcon} alt="close-icon" className={s.closeIcon} />
                </div>
                <div className={s.modalWrapper__purshasing}>
                    <div>
                        <div className={s.modalWrapper__purshasing__title}>
                            Purchasing
                        </div>
                        <div className={s.modalWrapper__purshasing__subtitle}>
                            Sending transaction with your wallet
                        </div>
                    </div>
                </div>
                <div className={s.modalWrapper__infoError}>
                    <img src={infoError} alt="error" />
                    <div>
                        <div className={s.modalWrapper__infoError__title}>
                            This creator is not verified
                        </div>
                        <div className={s.modalWrapper__infoError__subtitle}>
                            Purchase this item at your own risk
                        </div>
                    </div>
                    <img
                        src={avatar}
                        alt="user-avatar"
                        className={s.modalWrapper__infoError__avatar}
                    />
                </div>
                <div className={s.modalWrapper__buttons}>
                    <button className={s.modalWrapper__buttons__countine}>
                        I understand, continue
                    </button>
                    <button className={s.modalWrapper__buttons__cancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ModalFollowSteps;