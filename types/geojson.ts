export type RouteProperties = {
    name: string;
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
    type: string;
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
