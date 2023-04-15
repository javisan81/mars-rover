import surface from "./mars-surface.jpeg";
import rover from "./rover.png";
import {rotationByDirection} from "./MarsView";
import {Direction} from "../../../marsRover/MarsRoverInterface";

export const SurfaceElement = (): JSX.Element => (
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

export const RoverElement = ({direction}: RoverElementProps): JSX.Element => (
    <div className="surface-elem">
        <img
            src={rover}
            alt="Mars Rover"
            className="img-rover"
            style={{transform: `rotate(${rotationByDirection.get(direction)})`}}
        />
    </div>
);