export interface UserCoordinatesInterface {
    coords: UserCoordsInterface
    timestamp: number
}

export interface UserCoordsInterface {
    accuracy: number
    altitude: any
    altitudeAccuracy: any
    heading: any
    latitude: number
    longitude: number
    speed: any
}
