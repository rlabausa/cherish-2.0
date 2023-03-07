export interface IAddPostRequest {
    author: string;
    locationName: string;
    latitude: number;
    longitude: number;
    title: string;
    body: string;
}

export interface IGetPostsResponse {
    _embedded: {
        postList: IPost[];
    };
    _links: any;
}

export interface IPost {
    id: number;
    locationName: string;
    latitude: number;
    longitude: number;
    title: string;
    author: string;
    body: string;
    _links?: any;
    photoId: number;
}

export interface IAddPostResponse {
    id: number;
    filePath?: string;
}