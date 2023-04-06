import {render, screen} from "@testing-library/react";
import spyOn = jest.spyOn;
import * as dimensions from "../../../dimensions/map-dimensions";
import {useDimensions} from "../../../dimensions/map-dimensions";
import surface from "./mars-surface.jpeg";
import rover from "./rover.png";

interface MarsRowProps {
    rowNumber: number;
    cols: number;
}

const MarsRow = ({rowNumber, cols}: MarsRowProps) => {
    let rangeForSurfaces = Array.from(Array(cols).keys()).map(x => x + 1);
    if (rowNumber === 1) {
        rangeForSurfaces.shift();
    }
    return (
        <div aria-label={"Row"}>
            {rowNumber === 1 && <RoverElement/>}
            {
                rangeForSurfaces.map((col) => <SurfaceElement key={col}/>)
            }
        </div>
    )
}
const SurfaceElement = (): JSX.Element => (
    <div>
        <img
            src={surface}
            alt="Mars surface"
            className="img-surface"
        />
    </div>
);
const RoverElement = (): JSX.Element => (
    <div>
        <img
            src={rover}
            alt="Mars Rover"
            className="img-rover"
        />
    </div>
);
const MarsView = (): JSX.Element => {
    const {height, width} = useDimensions();
    return (
        <div>
            {
                Array.from(Array(height).keys()).map(x => x + 1).map(row => <MarsRow key={row} cols={width}
                                                                                     rowNumber={row}/>)
            }
        </div>
    );
}
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