import React, {useState} from "react";
import {changeHeight, changeWidth, getMapDimensions} from "../dimensions/map-dimensions";
import {useNavigate} from "react-router-dom";

export function NewMap() {
    const navigate = useNavigate();
    const [readyToContinue, setReadyToContinue] = useState(false);
    const onClick = () => {
        navigate("/map");
    }
    const onChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReadyToContinue(getMapDimensions().isCompleted());
        changeHeight(e.target.value);
    }
    const onChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReadyToContinue(getMapDimensions().isCompleted());
        changeWidth(e.target.value);
    }
    return (
        <div>
            <label htmlFor={"height"}>¿Cual será la altura de nuestro mapa?</label>
            <input id={"height"} type="text" onChange={onChangeHeight}/>
            <label htmlFor={"anchura"}>¿Cual será la anchura de nuestro mapa?</label>
            <input id={"anchura"} type="text" onChange={onChangeWidth}/>
            <label htmlFor={"continue"}>Juguemos</label>
            <input id="continue" type={"button"} onClick={onClick} disabled={!readyToContinue}/>
        </div>
    );
}