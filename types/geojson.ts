export type RouteProperties = {
    id: string;
    name: string;
    color: string; // unsafe
};

export type RouteGeoJSON = {
    type: 'FeatureCollection';
    features: {
        type: 'Feature';
        properties: RouteProperties;
        geometry: {
            type: 'LineString';
            coordinates: [number, number][];
        };
    }[];
};

export type MarkerProperties = {
    id: string;
    name: string;
    order: number;
};

export type MarkerGeoJSON = {
    type: 'FeatureCollection';
    features: {
        type: 'Feature';
        properties: MarkerProperties;
        geometry: {
            type: 'Point';
            coordinates: [number, number];
        };
    }[];
};
