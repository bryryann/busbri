type HexColor = `#${string}`;

type Coordinate = [number, number];

export type Stop = {
    id: string;
    name: string;
    coordinates: Coordinate;
    accessible: boolean;
};

export interface Line {
    id: string;
    name: string;
    color: HexColor; // unsafe
    route: {
        type: 'LineString',
        coordinates: Coordinate[],
    };
    stop_ids: string[];
};