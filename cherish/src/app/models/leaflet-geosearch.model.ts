export interface GeoSearchResult {
    location?: GeoSearchResultLocation;
    type?: string;
    target?: any;
}

export interface GeoSearchResultLocation {
    x: number; // lon
    y: number; // lat
    bounds?: [
        [number, number], // south, west - lat, lon
        [number, number]  // north, east - lat, lon
    ];
    label?: string; // formatted address
    raw?: any; // raw provider result
}

export interface MarkerDragResult {
    location?: MarkerDragResultLocation;
    target?: any;
    type?: string;
}

export interface MarkerDragResultLocation {
    lat?: number;
    lng?: number;
}

export enum GeoSearchEvent {
    ShowLocation = 'geosearch/showlocation',
    DragEnd = 'geosearch/marker/dragend'
}