import React from 'react';
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

let width=0;
let height=0;
const changeWidth = (newValue: string) => {
    width = parseInt(newValue);
}
const changeHeight = (newValue: string) => {
    height = parseInt(newValue);
}
function NewMap() {

    return (
        <div>
            <label htmlFor={"height"}>¿Cual será la altura de nuestro mapa?</label>
            <input id={"height"} type="text" onChange={(e) => changeHeight(e.target.value)}/>
            <label htmlFor={"anchura"}>¿Cual será la anchura de nuestro mapa?</label>
            <input id={"anchura"} type="text" onChange={(e) => changeWidth(e.target.value)}/>
        </div>
    );
}

describe('NewMap', function () {
    it('should ask for map dimensions', function () {
        render(<NewMap/>);
        expect(screen.getByText("¿Cual será la altura de nuestro mapa?")).toBeInTheDocument();
        expect(screen.getByText("¿Cual será la anchura de nuestro mapa?")).toBeInTheDocument();
    });

    it('should change map dimensions when user introduce them', function () {
        render(<NewMap/>);
        userEvent.type(screen.getByLabelText("¿Cual será la altura de nuestro mapa?"), "1");
        userEvent.type(screen.getByLabelText("¿Cual será la anchura de nuestro mapa?"), "2");
        expect(height).toEqual(1);
        expect(width).toEqual(2);
    });
});