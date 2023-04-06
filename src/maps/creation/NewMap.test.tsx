import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {NewMap} from "./NewMap";
import {getMapDimensions} from "../dimensions/map-dimensions";
import {createMemoryRouter, RouterProvider} from "react-router-dom";

function renderWithRouter(element: JSX.Element) {
    const newMapRouter = createMemoryRouter([{
        path: "/",
        element: element
    }, {
        path: "/map",
        element: <p>Estamos en el mapa del marsRover</p>
    }]);
    render(
        <RouterProvider router={newMapRouter}/>
    );
}

describe('NewMap', function () {
    it('should ask for map dimensions', function () {
        renderWithRouter(<NewMap/>);
        expect(screen.getByText("¿Cual será la altura de nuestro mapa?")).toBeInTheDocument();
        expect(screen.getByText("¿Cual será la anchura de nuestro mapa?")).toBeInTheDocument();
    });

    it('should change map dimensions when user introduce them', function () {
        renderWithRouter(<NewMap/>);
        userEvent.type(screen.getByLabelText("¿Cual será la altura de nuestro mapa?"), "1");
        userEvent.type(screen.getByLabelText("¿Cual será la anchura de nuestro mapa?"), "2");
        expect(getMapDimensions().height).toEqual(1);
        expect(getMapDimensions().width).toEqual(2);
    });

    it('should redirect to the page that paints the rovers in the map', function () {
        renderWithRouter(<NewMap/>);
        userEvent.type(screen.getByLabelText("¿Cual será la altura de nuestro mapa?"), "1");
        userEvent.type(screen.getByLabelText("¿Cual será la anchura de nuestro mapa?"), "2");
        fireEvent.click(screen.getByText("Juguemos"));
        expect(screen.getByText("Estamos en el mapa del marsRover")).toBeInTheDocument();
    });

    it('should not redirect if the user didnt fill the dimensions', function () {
        renderWithRouter(<NewMap/>);
        fireEvent.click(screen.getByText("Juguemos"));
        expect(screen.queryByText("Estamos en el mapa del marsRover")).not.toBeInTheDocument();
    });

    it('should not allow negative numbers inside the dimensions inputs', function () {
        renderWithRouter(<NewMap/>);
        userEvent.type(screen.getByLabelText("¿Cual será la altura de nuestro mapa?"), "-1");
        userEvent.type(screen.getByLabelText("¿Cual será la anchura de nuestro mapa?"), "-2");
        expect(screen.getByText("No se aceptan dimensiones negativas")).toBeInTheDocument();
        fireEvent.click(screen.getByText("Juguemos"));
        expect(screen.queryByText("Estamos en el mapa del marsRover")).not.toBeInTheDocument();
    });

    it('should not allow introducing text, just numbers', function () {
        renderWithRouter(<NewMap/>);
        userEvent.type(screen.getByLabelText("¿Cual será la altura de nuestro mapa?"), "xx");
        userEvent.type(screen.getByLabelText("¿Cual será la anchura de nuestro mapa?"), "yy");
        expect(screen.getByLabelText("¿Cual será la altura de nuestro mapa?")).not.toHaveValue("xx");
        expect(screen.getByLabelText("¿Cual será la anchura de nuestro mapa?")).not.toHaveValue("yy");
    });
});