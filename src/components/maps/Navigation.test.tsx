import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router";
import {Navigation} from "./Navigation";


describe('Navigation', function () {
    it('should go to the new map form', function () {
        render(<MemoryRouter initialEntries={["/"]}><Navigation/></MemoryRouter>);
        expect(screen.getByText("¿Cual será la altura de nuestro mapa?")).toBeInTheDocument()
    });

    it('should go to MarsView component', function () {
        render(<MemoryRouter initialEntries={["/map"]}><Navigation/></MemoryRouter>);
        expect(screen.getByText("Forward")).toBeInTheDocument()
    });
});