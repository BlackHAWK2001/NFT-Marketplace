import s from './Upload.module.scss';
import singleNft from '../../assets/SingleNft.png';
import multipleNft from '../../assets/MultipleNft.png';
import { Link } from 'react-router';
import BreadCrumps from '../../components/BreadCrumps/BreadCrumps';

const Upload = () => {
    return (
        <>
            <BreadCrumps />
            <section className={s.upload}>
                <div className={s.container}>
                    <div className={s.uploadContent}>
                        <div className={s.uploadInfo}>
                            <h1 className={s.uploadTitle}>Upload item</h1>
                            <p className={s.uploadSubtitle}>
                                Choose <span className={s.single}>“Single”</span> if you want your collectible to be one of a kind or
                                <span className={s.multiple}> “Multiple” </span>
                                if you want to sell one collectible multiple times
                            </p>
                        </div>
                        <div className={s.uploadVariant}>
                            <div className={s.uploadBlock}>
                                <img src={singleNft} alt="Nft image" className={s.uploadImage} />
                                <Link to='/create ' className={s.uploadSingle}>
                                    Create Single
                                </Link>
                            </div>
                            <div className={s.uploadBlock}>
                                <img src={multipleNft} alt="Nft image" className={s.uploadImage} />
                                <Link to='/create' className={s.uploadMultiple}>
                                    Multiple
                                </Link>
                            </div>
                        </div>
                        <p className={s.uploadBottomInfo}>We do not own your private keys and cannot access your funds without your confirmation.</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Upload
