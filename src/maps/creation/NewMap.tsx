import React, {useState} from "react";
import {changeHeight, changeWidth, getMapDimensions} from "../dimensions/map-dimensions";
import {useNavigate} from "react-router-dom";
export function NewMap() {
    const navigate = useNavigate();
    const [readyToContinue, setReadyToContinue] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const onClick = () => {
        navigate("/map");
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement>, changeMethod: (newValue: number) => void) {
        try {
            changeMethod(parseInt(e.target.value));
            setReadyToContinue(getMapDimensions().isCompleted());
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
        <div>
            {errorMessage && <span>{errorMessage}</span>}
            <label htmlFor={"height"}>¿Cual será la altura de nuestro mapa?</label>
            <input id={"height"} type="number" onChange={onChangeHeight}/>
            <label htmlFor={"anchura"}>¿Cual será la anchura de nuestro mapa?</label>
            <input id={"anchura"} type="number" onChange={onChangeWidth}/>
            <label htmlFor={"continue"}>Juguemos</label>
            <input id="continue" type={"button"} onClick={onClick} disabled={!readyToContinue}/>
        </div>
    );
}