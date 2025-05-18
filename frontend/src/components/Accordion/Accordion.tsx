import { FC } from "react";
import s from './Accordion.module.scss'
import arrowDown from '../../assets/arrow-down.png'
import { Link } from "react-router";

export interface IAccordion {
    title: string;
    content: string;
    index: number;
    activeIndex: number;
    onAccordionClick: (index: number) => void;
}

const Accordion: FC<IAccordion> = ({ title, content, index, activeIndex, onAccordionClick }) => {
    const isActive = index === activeIndex;
    return (
        <div className={s.accordionItem} key={index}>
            <div className={s.accordionBlock} onClick={() => onAccordionClick(index)}>
                <p className={s.accordionTitle}>{title}</p>
                <img src={arrowDown} alt="Arrow Icon"  className={s.arrowDown}/>
            </div>
            {isActive &&
                <div className={s.accordionContent}>
                    {content}
                    <Link to="#" className={s.accordionBtn}>Learn more</Link>
                </div>
            }
        </div>
    )
}

export default Accordion
