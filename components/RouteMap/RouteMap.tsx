import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Map, Camera, type CameraRef, GeoJSONSource, Layer, } from '@maplibre/maplibre-react-native';

import { Bounds } from '@/types/bounds';
import { Line } from '@/types/lines';
import { MarkerGeoJSON, RouteGeoJSON } from '@/types/geojson';
import boundsData from '@/data/bounds.json';

const BOUNDS = boundsData as Bounds;

type RouteMapProps = {
    lineDetails: Line;
};

const RouteMap = ({ lineDetails }: RouteMapProps) => {
    const cameraRef = useRef<CameraRef>(null);

    const routeGeoJSON: RouteGeoJSON = {
        type: 'FeatureCollection',
        features: [
            {
                type: 'Feature',
                properties: {
                    id: lineDetails.id,
                    name: lineDetails.name,
                    color: lineDetails.color,
                },
                geometry: {
                    type: 'LineString',
                    coordinates: lineDetails.route.coordinates
                },
            },
        ],
    };

    const stopsGeoJSON: MarkerGeoJSON = {
        type: 'FeatureCollection',
        features: lineDetails.stops.map((stop) => ({
            type: 'Feature',
            properties: {
                id: stop.id,
                name: stop.name,
                order: stop.order,
            },
            geometry: {
                type: 'Point',
                coordinates: stop.coordinates
            },
        })),
    };

    return (
        <Map
            style={styles.map}
            mapStyle="https://tiles.openfreemap.org/styles/positron"
        >
            <Camera
                ref={cameraRef}
                zoom={12}
                minZoom={12}
                maxZoom={18}
                maxBounds={BOUNDS.CITY_BOUNDS}
                center={BOUNDS.CITY_CENTER}
            />

            {/* Route */}
            <GeoJSONSource
                id={`route-${lineDetails.id}`}
                data={routeGeoJSON}
            >
                <Layer
                    type="line"
                    id={`route-line-${lineDetails.id}`}
                    paint={{
                        'line-color': lineDetails.color,
                        'line-width': 4,
                    }}
                    layout={{
                        'line-cap': 'round',
                        'line-join': 'round',
                    }}
                />
            </GeoJSONSource>

            {/* Stops */}
            <GeoJSONSource
                id={`stops-${lineDetails.id}`}
                data={stopsGeoJSON}
            >
                <Layer
                    type="circle"
                    id={`stops-points-${lineDetails.id}`}
                    paint={{
                        'circle-radius': 6,
                        'circle-color': lineDetails.color,
                        'circle-stroke-width': 2,
                        'circle-stroke-color': '#ffffff',
                    }}
                />
            </GeoJSONSource>
        </Map>
    );
};

export default RouteMap;

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 280,
    },
});