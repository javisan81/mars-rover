import React, {useState} from "react";
import {changeHeight, changeWidth, useDimensions} from "../../../dimensions/map-dimensions";
import {useNavigate} from "react-router-dom";
import "./newMap.css";

export function NewMap() {
    const navigate = useNavigate();
    const currentDimensions = useDimensions();
    const [readyToContinue, setReadyToContinue] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const onClick = () => {
        navigate("/map");
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>, changeMethod: (newValue: number) => void) {
        try {
            changeMethod(parseInt(e.target.value));
            setReadyToContinue(currentDimensions.isCompleted());
        } catch (e) {
            if (e instanceof Error) setErrorMessage(e.message);
        }
    }

    const onChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e, changeHeight);
    }

    const onChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e, changeWidth);
    }
    return (
        <div className={"newMap"}>
            <h1>Mars Rover</h1>
            {errorMessage && <span>{errorMessage}</span>}
            <div className={"question"}>
                <label htmlFor={"height"}>¿Cual será la altura de nuestro mapa?</label>
                <input id={"height"} type="number" onChange={onChangeHeight}/>
            </div>
            <div className={"question"}>
                <label htmlFor={"anchura"}>¿Cual será la anchura de nuestro mapa?</label>
                <input id={"anchura"} type="number" onChange={onChangeWidth}/>
            </div>
            <button id="continue" type={"button"} onClick={onClick} disabled={!readyToContinue}>
                Juguemos
            </button>
        </div>
    );
}