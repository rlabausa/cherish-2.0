export interface IGeoSearchResult {
    location?: {
        x: number; // lon
        y: number; // lat
        bounds: [
            [number, number], // south, west - lat, lon
            [number, number]  // north, east - lat, lon
        ];
        label: string; // formatted address
        raw: any; // raw provider result
    };
    type?: string;
    target?: any;
}
export interface IMarkerDragResult {
    location: {
        lat: number;
        lng: number;
    };
    target: any;
    type: string;
}

export enum GeoSearchEvent {
    ShowLocation = 'geosearch/showlocation',
    DragEnd = 'geosearch/marker/dragend'
}