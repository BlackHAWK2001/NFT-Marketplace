import s from './Footer.module.scss'
import footerLogo from '../../assets/logo.png';
import buttonRight from '../../assets/button-right.png';

const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <div className={s.footerContent}>
                    <div className={s.footerTop}>
                        <div className={s.footerContentColumn}>
                            <img src={footerLogo} alt="Logo" className={s.footerLogo} />
                            <h2 className={s.footerSublogoTitle}>The New Creative Economy.</h2>
                        </div>
                        <div className={s.footerContentColumn}>
                            <h3 className={s.footerColumnTitle}>Stacks</h3>
                            <div className={s.footerContentBlock}>
                                <p className={s.footerColumnSubtitle}>Discover</p>
                                <p className={s.footerColumnSubtitle}>Connect wallet</p>
                                <p className={s.footerColumnSubtitle}>Create item</p>
                            </div>
                        </div>
                        <div className={s.footerContentColumn}>
                            <h3 className={s.footerColumnTitle}>Info</h3>
                            <div className={s.footerContentBlock}>
                                <p className={s.footerColumnSubtitle}>Download</p>
                                <p className={s.footerColumnSubtitle}>Demos</p>
                                <p className={s.footerColumnSubtitle}>Support</p>
                            </div>
                        </div>
                        <div className={s.footerContentColumn}>
                            <h3 className={s.footerTitleNewsseller}>Join Newsletter</h3>
                                <p className={s.footerNewssellerDesc}>Subscribe our newsletter to get more free design course and resource</p>
                                <div className={s.footerForm}>
                                    <input type="email" name='email' className={s.footerInput} placeholder='Enter your email' />
                                    <img src={buttonRight} alt="" className={s.footerButtonRight} />
                                </div>
                        </div>
                    </div>  
                </div>
                <div className={s.footerBottom}>
                        <p className={s.footerBottomTitle}>Copyright © 2025 BTP NFT. All rights reserved</p>
                        <p className={s.footerBottomTitle}>We use cookies for better service.</p>
                    </div>
            </div>
        </footer>
    )
}

export default Footer
