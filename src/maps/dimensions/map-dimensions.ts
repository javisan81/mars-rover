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

export const changeWidth = (newValue: number): void => {
    if(newValue<0){
        throw new Error("No se aceptan dimensiones negativas");
    }
    mapDimensions.width = newValue;
}
export const changeHeight = (newValue: number): void => {
    if(newValue<0){
        throw new Error("No se aceptan dimensiones negativas");
    }
    mapDimensions.height = newValue;
}
export const getMapDimensions = (): MapDimensions => {
    return mapDimensions;
}