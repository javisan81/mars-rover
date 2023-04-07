import surface from "./mars-surface.jpeg";
import rover from "./rover.png";
import {useDimensions} from "../../../dimensions/map-dimensions";
import {MoveCommand, Position, useMarsRover} from "./MarsRover";
import {useState} from "react";

interface MarsRowProps {
    rowNumber: number;
    cols: number;
    roverPosition: Position;
}

export const COLUMN_NAME = "Col";
export const ROW_NAME = "Row";


interface MarsColPros {
    rowNumber: number,
    colNumber: number,
    roversRow: number,
    roversCol: number
}

const MarsCol = ({rowNumber, colNumber, roversRow, roversCol}: MarsColPros): JSX.Element => {
    if (rowNumber === roversRow && colNumber === roversCol) {
        return <RoverElement/>;
    } else {
        return <SurfaceElement/>;
    }
}

const MarsRow = ({rowNumber, cols, roverPosition}: MarsRowProps) => {
    let rangeForSurfaces = Array.from(Array(cols).keys()).map(x => x + 1);
    const {row: roversRow, col: roversCol} = roverPosition;
    return (
        <div aria-label={`${ROW_NAME}${rowNumber}`}>
            {
                rangeForSurfaces.map((col) => (
                    <div key={col} aria-label={`${COLUMN_NAME}${col}`}>
                        {
                            <MarsCol rowNumber={rowNumber} colNumber={col} roversRow={roversRow} roversCol={roversCol}/>
                        }
                    </div>
                ))
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
    const marsRover = useMarsRover();
    const [roverPosition, setRoverPosition] = useState(marsRover.getPosition());

    const moveForward = () => {
        marsRover.move([MoveCommand.Forward])
        setRoverPosition(marsRover.getPosition());
    }
    return (
        <div>
            {
                Array.from(Array(height).keys()).map(x => x + 1).map(row => <MarsRow key={row} cols={width}
                                                                                     rowNumber={row}
                                                                                     roverPosition={roverPosition}/>)
            }
            <div>
                <button onClick={moveForward}>Forward</button>
            </div>
        </div>
    );
}