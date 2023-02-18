export interface IPlaceOutput {
    place_id: number;
    licence:string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    display_name: string;
    address: {
        road: string;
        town: string;
        municipality:string;
        state: string;
        "ISO3166-2-lvl4": string;
        postcode: string;
        country: string;
        country_code: string;
    },
    boundingbox: string[];
}