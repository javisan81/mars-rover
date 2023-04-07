import {render, screen} from "@testing-library/react";
import spyOn = jest.spyOn;
import * as dimensions from "../../../dimensions/map-dimensions";
import {MarsView} from "./MarsView";

const mockedUseDimensions = spyOn(dimensions, "useDimensions");

function mockDimensions(height: number, width: number) {
    mockedUseDimensions.mockReturnValue({
        height: height,
        width: width,
        isCompleted: () => true
    });
}

describe("MarsView", () => {
    it.each([{height:1, width:1}, {height: 2, width: 2}, {height: 6, width: 5}])
    ("renders exactly one rover withing the surface of dimensions %p",  ({height, width}) => {
        mockDimensions(height, width);
        render(<MarsView/>);
        const rows = screen.queryAllByLabelText(/Row/);
        expect(rows.length).toBe(height);
        const surfaceElements = screen.queryAllByAltText(/Mars surface/);
        expect(surfaceElements.length).toBe(height*width-1);
        const rover =  screen.queryAllByAltText(/Mars Rover/);
        expect(rover.length).toBe(1);
    });
});