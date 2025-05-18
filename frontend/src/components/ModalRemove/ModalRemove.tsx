import s from "./ModalRemove.module.scss";
import closeIcon from '../../assets/cancel.png'

const ModalRemove = () => {
    return (
        <div className={s.modal}>
            <div className={s.overlay}></div>

            <section className={s.modalWrapper}>
                <div className={s.modalWrapper__top}>
                    <h1 className={s.modalWrapper__top__title}>Remove from sale</h1>
                    <img src={closeIcon} alt="close-modal" className={s.closeIcon} />
                </div>
                <div className={s.modalWrapper__purshasing}>
                    Do you really want to remove your item from sale? You can put it on sale anytime
                </div>
                <div className={s.modalWrapper__buttons}>
                    <button className={s.modalWrapper__buttons__countine}>
                        Remove now
                    </button>
                    <button className={s.modalWrapper__buttons__cancel}>
                        Cancel
                    </button>
                </div>
            </section>
        </div>
    )
}

export default ModalRemove;