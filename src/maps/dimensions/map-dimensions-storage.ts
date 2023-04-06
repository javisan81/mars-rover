import {MapDimensions} from "./map-dimensions";

class MyMapDimensions implements MapDimensions{
    height: number;
    width: number;

    constructor(height: number, width: number) {
        this.height = height;
        this.width = width;
    }

    isCompleted(): boolean {
        return this.height > 0 && this.width> 0;
    }
}

export const mapDimensions: MapDimensions = new MyMapDimensions(0,0);