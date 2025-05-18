import s from './BreadCrumps.module.scss';
import { Link, useLocation } from 'react-router';
import arrowLeft from '../../assets/Left arrow.png'
import arrowRight from '../../assets/ArrowRight.png'

const BreadCrumps = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean)

    return (
        <section className={s.breadCrumps}>
            <div className={s.container}>
                <div className={s.breadCrumpsContent}>
                    <div className={s.breadCrumpsLeft}>
                        <Link to='/profile'>
                            <div className={s.arrowLeft}>
                                <img src={arrowLeft} alt="Icon" className={s.arrowLeftIcon} />
                                Back to profile
                            </div>
                        </Link>
                    </div>
                    <div className={s.breadCrumpsRight}>
                        <Link to="/profile" className={s.breadCrumpsTitle}>Profile</Link>
                        <img src={arrowRight} alt="Icon" />
                        {pathSegments.length > 0 && (
                            <>
                                <p className={s.breadCrumpsSegment}>            {(() => {
                                    const text = pathSegments[pathSegments.length - 1];
                                    const words = text.split(/(?=[A-Z])|[-_]/); 
                                    if (words.length > 1) {
                                        return words[0].charAt(0).toUpperCase() + words[0].slice(1) + ' ' + words.slice(1).join('');
                                    }
                                    return text.charAt(0).toUpperCase() + text.slice(1);
                                })()}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BreadCrumps
