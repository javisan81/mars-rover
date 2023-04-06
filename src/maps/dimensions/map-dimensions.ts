import {mapDimensions} from "./map-dimensions-storage";

export interface MapDimensions {
    width: number;
    height: number;
    isCompleted: () => boolean;
}

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