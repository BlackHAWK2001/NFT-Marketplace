import s from './Error.module.scss';
import buttonRight from '../../assets/button-right.png'
import notFoundImage from '../../assets/Nf.png';

const Error = () => {
    return (
        <section className={s.notFound}>
            <div className={s.container}>
                <div className={s.notFoundContent}>
                    <img src={notFoundImage} alt="" className={s.notFoundImage} />
                    <div className={s.notFoundInfo}>
                        <h2 className={s.notFoundTitle}>Sorry, we couldn’t find any results for this search.</h2>
                        <p className={s.notFoundSubtitle}>Maybe give one of these a try?</p>
                        <form className={s.notFoundSearchForm}>
                            <input
                                type="text"
                                name="search"
                                className={s.notFoundInput}
                                placeholder="Enter your search"
                            />
                            <img
                                src={buttonRight}
                                alt="Search button"
                                className={s.footerButtonRight}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Error
