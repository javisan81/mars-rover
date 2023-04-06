import surface from "./mars-surface.jpeg";
import rover from "./rover.png";
import {useDimensions} from "../../../dimensions/map-dimensions";

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
export const MarsView = (): JSX.Element => {
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