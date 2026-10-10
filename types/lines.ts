type HexColor = `#${string}`;

type Coordinate = [number, number];

export type Stop = {
    id: string;
    name: string;
    order: number;
    coordinates: Coordinate;
    routes: number[];
};

export interface Line {
    id: string;
    name: string;
    color: HexColor; // unsafe
    route: {
        type: 'LineString',
        coordinates: Coordinate[],
    };
    stops: Stop[];
};