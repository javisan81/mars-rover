import React from 'react';
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {NewMap} from "./NewMap";
import {getMapDimensions} from "../dimensions/map-dimensions";

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
        expect(getMapDimensions().height).toEqual(1);
        expect(getMapDimensions().width).toEqual(2);
    });
});