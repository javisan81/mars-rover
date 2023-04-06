import React from "react";
import {changeHeight, changeWidth} from "../dimensions/map-dimensions";

export function NewMap() {
    return (
        <div>
            <label htmlFor={"height"}>¿Cual será la altura de nuestro mapa?</label>
            <input id={"height"} type="text" onChange={(e) => changeHeight(e.target.value)}/>
            <label htmlFor={"anchura"}>¿Cual será la anchura de nuestro mapa?</label>
            <input id={"anchura"} type="text" onChange={(e) => changeWidth(e.target.value)}/>
        </div>
    );
}