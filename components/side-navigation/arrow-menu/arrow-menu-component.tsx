import ArrowMenuPresenter from "./arrow-menu-presenter"
import { useState } from "react"

export interface ArrowMenuProps {
    isEnable: boolean;
    text: {
        title: string;
        titleLink: string;
        menu: Array<string>;
        menuLink: Array<string>;
    };
    onClickArrow?: () => void;
}

export default function ArrowMenuComponent(props: ArrowMenuProps){

    const [isEnable, setIsEnable] = useState(props.isEnable);
    const onClickArrow = () => {
        setIsEnable(!isEnable);
    }

    return (
        <ArrowMenuPresenter isEnable={isEnable} onClickArrow={onClickArrow} text={props.text}/>
    )
}