type HexColor = `#${string}`;

export interface Line {
    id: string;
    name: string;
    color: HexColor; // unsafe
}