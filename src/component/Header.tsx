import React, {ReactElement} from "react";
import '../css/header.css';
import MoreIcon from '@material-ui/icons/MoreVert';
import {IconButton} from "@material-ui/core";

type HeaderProps = {
    title: string
    options?: ReactElement
}

export const Header = (props: HeaderProps) => (
    <div className={"header"}>
        <div className={"div-title"}>
            <span className="rainbow-text">{props.title}</span>
        </div>
        {
            props.options ? <div className={"div-option"}>
                    <IconButton edge="end" color="inherit">
                        <MoreIcon/>
                    </IconButton>
                </div> :
                <div></div>
        }

    </div>
);