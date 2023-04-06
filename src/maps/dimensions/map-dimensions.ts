export interface MapDimensions {
    width: number;
    height: number;
}

const mapDimensions: MapDimensions = {
    width: 0,
    height: 0,
}

export const changeWidth = (newValue: string): void => {
    mapDimensions.width = parseInt(newValue);
}
export const changeHeight = (newValue: string): void => {
    mapDimensions.height = parseInt(newValue);
}
export const getMapDimensions = (): MapDimensions => {
    return mapDimensions;
}