export interface MapDimensions {
    width: number;
    height: number;
    isCompleted: () => boolean;
}
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

const mapDimensions: MapDimensions = new MyMapDimensions(0,0);

export const changeWidth = (newValue: string): void => {
    mapDimensions.width = parseInt(newValue);
}
export const changeHeight = (newValue: string): void => {
    mapDimensions.height = parseInt(newValue);
}
export const getMapDimensions = (): MapDimensions => {
    return mapDimensions;
}