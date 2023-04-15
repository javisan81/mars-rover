import {useDimensions} from "../../../dimensions/map-dimensions";
import {useMarsRover} from "../../../marsRover/MarsRoverHook";
import {useState} from "react";
import {RoverElement, SurfaceElement} from "./MarsElements";
import {Direction, MoveCommand, Position} from "../../../marsRover/MarsRoverInterface";
import "./marsView.css";

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
        <div aria-label={`${ROW_NAME}${rowNumber}`} className="surface-grid-wrapper">
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

export const MarsView = (): JSX.Element => {
    const {height, width} = useDimensions();
    const marsRover = useMarsRover(height, width);
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