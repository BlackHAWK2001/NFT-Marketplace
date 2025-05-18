import s from './Frequently.module.scss';
import userIcon from '../../assets/userIcon.svg';
import supportIcon from '../../assets/customer-support 1.svg';
import hoistingIcon from '../../assets/cloud-upload 1.svg';
import productIcon from '../../assets/window-responsive 1.svg';
import { useState } from 'react';
import Accordion from '../../components/Accordion/Accordion';
import { NavLink } from 'react-router';

const AccordionMenu = [
  {
    index: 0,
    title: "How does it work",
    content: "The Stacks series of products: Stacks: Landing Page Kit, Stacks: Portfolio Kit,  Stacks: eCommerce Kit. Stacks is a production-ready library of stackable content blocks built in React Native. Mix-and-match dozens of responsive elements to quickly configure your favorite landing page layouts or hit the ground running with 10 pre-built templates, all in light or dark mode. "
  },
  {
    index: 1,
    title: "How to start with Stacks",
    content: "The Stacks series of products: Stacks: Landing Page Kit, Stacks: Portfolio Kit,  Stacks: eCommerce Kit. Stacks is a production-ready library of stackable content blocks built in React Native. Mix-and-match dozens of responsive elements to quickly configure your favorite landing page layouts or hit the ground running with 10 pre-built templates, all in light or dark mode. "
  },
  {
    index: 2,
    title: "Dose it suppport Dark Mode",
    content: "The Stacks series of products: Stacks: Landing Page Kit, Stacks: Portfolio Kit,  Stacks: eCommerce Kit. Stacks is a production-ready library of stackable content blocks built in React Native. Mix-and-match dozens of responsive elements to quickly configure your favorite landing page layouts or hit the ground running with 10 pre-built templates, all in light or dark mode. "
  },
  {
    index: 3,
    title: "Does it support Auto-Layout",
    content: "The Stacks series of products: Stacks: Landing Page Kit, Stacks: Portfolio Kit,  Stacks: eCommerce Kit. Stacks is a production-ready library of stackable content blocks built in React Native. Mix-and-match dozens of responsive elements to quickly configure your favorite landing page layouts or hit the ground running with 10 pre-built templates, all in light or dark mode. "
  },
  {
    index: 4,
    title: "What is Stacks Design System",
    content: "The Stacks series of products: Stacks: Landing Page Kit, Stacks: Portfolio Kit,  Stacks: eCommerce Kit. Stacks is a production-ready library of stackable content blocks built in React Native. Mix-and-match dozens of responsive elements to quickly configure your favorite landing page layouts or hit the ground running with 10 pre-built templates, all in light or dark mode. "
  },
]

const Frequently = () => {
  const [ActiveIndex, setActiveIndex] = useState(-1);

  const handleAccordionClick = (index: number) => {
    setActiveIndex(index === ActiveIndex ? -1 : index)
  };

  return (
    <section className={s.frequently}>
      <div className={s.container}>
        <div className={s.frequentlyContent}>
          <div className={s.frequentlyTop}>
            <p className={s.frequentlyAbout}>LEARN HOW TO GET STARTED</p>
            <h1 className={s.frequentlyTitle}>Frequently asked questions</h1>
            <p className={s.frequentlySubtitle}>Join Stacks community now to get free updates and also alot of freebies are waiting for you
              or <span className={s.frequentlySupport}> Contact Support</span>
            </p>
          </div>
          <div className={s.frequentlyBottom}>
            <aside className={s.frequentlyLeft}>
              <div className={s.frequentlyAsideBlock}>
                <img src={userIcon} alt="" />
                <NavLink to='/' className={s.frequentlyTitleActive}>General </NavLink>
              </div>
              <div className={s.frequentlyAsideBlock}>
                <img src={supportIcon} alt="" />
                <p className={s.frequentlyBlockTitle}>Support</p>
              </div>
              <div className={s.frequentlyAsideBlock}>
                <img src={hoistingIcon} alt="" />
                <p className={s.frequentlyBlockTitle}>Hosting</p>
              </div>
              <div className={s.frequentlyAsideBlock}>
                <img src={productIcon} alt="" />
                <p className={s.frequentlyBlockTitle}>Product</p>
              </div>
            </aside>
            <div className={s.frequentlyRight}>
              <div className={s.frequentlyAccordion}>
                {AccordionMenu.map((item, index) => (
                  <Accordion
                    key={index}
                    title={item.title}
                    content={item.content}
                    index={index}
                    activeIndex={ActiveIndex}
                    onAccordionClick={() => handleAccordionClick(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Frequently
