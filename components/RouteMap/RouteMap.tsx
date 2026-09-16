import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Map, Camera, type CameraRef, } from '@maplibre/maplibre-react-native';

import boundsData from '@/data/bounds.json';
import { Bounds } from '@/types/bounds';
import { Line } from '@/types/lines';

const BOUNDS = boundsData as Bounds;

type RouteMapProps = {
    lineDetails: Line;
};

const RouteMap = ({ lineDetails }: RouteMapProps) => {
    const cameraRef = useRef<CameraRef>(null);

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
        </Map>
    );
};


export default RouteMap;

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { 
        width: '100%',
        height: 280,
    },
});