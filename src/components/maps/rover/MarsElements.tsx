import surface from "./mars-surface.jpeg";
import {Direction} from "./MarsRover";
import rover from "./rover.png";
import {rotationByDirection} from "./MarsView";

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
    <div>
        <img
            src={rover}
            alt="Mars Rover"
            className="img-rover"
            style={{transform: `rotate(${rotationByDirection.get(direction)})`}}
        />
    </div>
);