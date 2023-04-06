import {render, screen} from "@testing-library/react";
import spyOn = jest.spyOn;
import * as dimensions from "../../../dimensions/map-dimensions";
import {MarsView} from "./MarsView";

const mockedUseDimensions = spyOn(dimensions, "useDimensions");
describe("MarsView", () => {
    it("renders exactly one rover withing the surface", async () => {
        mockedUseDimensions.mockReturnValue({
            height: 6,
            width: 5,
            isCompleted: () => true
        });
        render(<MarsView/>);
        const rows = screen.queryAllByLabelText(/Row/);
        expect(rows.length).toBe(6);
        const surfaceElements = screen.queryAllByAltText(/Mars surface/);
        expect(surfaceElements.length).toBe(29);
        const rover = await screen.findAllByAltText(/Mars Rover/);
        expect(rover.length).toBe(1);
    });
});