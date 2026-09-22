type HexColor = `#${string}`;

type Coordinate = [number, number];

type Stop = {
    id: string;
    name: string;
    order: number;
    coordinates: Coordinate;
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