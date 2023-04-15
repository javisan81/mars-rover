import surface from "./mars-surface.jpeg";
import rover from "./rover.png";
import {useDimensions} from "../../../dimensions/map-dimensions";
import {Direction, MoveCommand, Position, useMarsRover} from "./MarsRover";
import {useState} from "react";

interface MarsRowProps {
    rowNumber: number;
    cols: number;
    roverPosition: Position;
    roverDirection: Direction;
}

export const COLUMN_NAME = "Col";
export const ROW_NAME = "Row";
export const rotationByDirection = new Map<Direction, String>([
    [Direction.North, "90deg"],
    [Direction.South, "270deg"],
    [Direction.East, "180deg"],
    [Direction.West, "0deg"]
]);

interface MarsColPros {
    rowNumber: number,
    colNumber: number,
    roversRow: number,
    roversCol: number,
    roverDirection: Direction
}

const MarsCol = ({rowNumber, colNumber, roversRow, roversCol, roverDirection}: MarsColPros): JSX.Element => {
    if (rowNumber === roversRow && colNumber === roversCol) {
        return <RoverElement direction={roverDirection}/>;
    } else {
        return <SurfaceElement/>;
    }
}

const MarsRow = ({rowNumber, cols, roverPosition, roverDirection}: MarsRowProps) => {
    let rangeForSurfaces = Array.from(Array(cols).keys()).map(x => x + 1);
    const {row: roversRow, col: roversCol} = roverPosition;
    return (
        <div aria-label={`${ROW_NAME}${rowNumber}`}>
            {
                rangeForSurfaces.map((col) => (
                    <div key={col} aria-label={`${COLUMN_NAME}${col}`}>
                        {
                            <MarsCol rowNumber={rowNumber} colNumber={col} roversRow={roversRow} roversCol={roversCol}
                                     roverDirection={roverDirection}/>
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

interface RoverElementProps {
    direction: Direction
}

const RoverElement = ({direction}: RoverElementProps): JSX.Element => (
    <div>
        <img
            src={rover}
            alt="Mars Rover"
            className="img-rover"
            style={{transform: `rotate(${rotationByDirection.get(direction)})`}}
        />
    </div>
);
export const MarsView = (): JSX.Element => {
    const {height, width} = useDimensions();
    const marsRover = useMarsRover();
    const [roverPosition, setRoverPosition] = useState(marsRover.getPosition());
    const [roverDirection, setRoverDirection] = useState(marsRover.getDirection());

    function move(moveCommand: MoveCommand) {
        marsRover.move([moveCommand])
        setRoverPosition(marsRover.getPosition());
    }

    function turn(turnCommand: MoveCommand) {
        marsRover.move([turnCommand])
        setRoverDirection(marsRover.getDirection());
    }

    const rowsStream = Array.from(Array(height).keys()).map(x => x + 1);
    return (
        <div>
            {
                rowsStream.map(row => <MarsRow key={row} cols={width}
                                            rowNumber={row}
                                            roverPosition={roverPosition}
                                            roverDirection={roverDirection}/>)
            }
            <div>
                <button onClick={() => move(MoveCommand.Forward)}>Forward</button>
                <button onClick={() => move(MoveCommand.Backward)}>Backward</button>
                <button onClick={() => turn(MoveCommand.Left)}>Left</button>
                <button onClick={() => turn(MoveCommand.Right)}>Right</button>
            </div>
        </div>
    );
}