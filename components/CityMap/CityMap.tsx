import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import {
    Map,
    Camera,
    GeoJSONSource,
    Layer,
    type CameraRef,
} from '@maplibre/maplibre-react-native';

import boundsData from '@/data/bounds.json';
import { Bounds } from '@/types/bounds';
import { MarkerGeoJSON, RouteGeoJSON } from '@/types/geojson';
import { Line } from '@/types/lines';

const BOUNDS = boundsData as Bounds;

interface CityMapProps {
  linesData: Line[];
  selectedLineId?: string | null;
};

const CityMap = ({ 
  linesData,
  selectedLineId,
}: CityMapProps) => {
  const cameraRef = useRef<CameraRef>(null);

  const rotas: RouteGeoJSON = {
    type: 'FeatureCollection' as const,
    features: linesData.map((line, index) => ({
        type: 'Feature',
        properties: {
            id: line.id,
            name: line.name,
            color: line.color,
            offset: (index % 3 - 1) * 2,
        },
        geometry: {
            type: 'LineString',
            coordinates: line.route.coordinates
        }
    }))
  };

  const startPoint = linesData[0].stops[0];
  const marcos: MarkerGeoJSON = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          id: startPoint.id,
          name: startPoint.name,
          order: startPoint.order
        },
        geometry: {
          type: 'Point',
          coordinates: startPoint.coordinates
        },
      },
    ],
  };

  return (
    <Map
      style={styles.map}
      mapStyle="https://tiles.openfreemap.org/styles/positron"
      // Garante que o mapa abre centralizado em Birigui, mesmo
      // com maxBounds ativo no Camera (ver comentário do Camera)
      onDidFinishLoadingMap={() => {
        cameraRef.current?.jumpTo({ center: BOUNDS.CITY_CENTER, zoom: 13 });
      }}
    >
      {/* Controla zoom/limites — não desenha nada visualmente */}
      <Camera
        ref={cameraRef}
        minZoom={12}
        maxZoom={18}
        maxBounds={BOUNDS.CITY_BOUNDS}
      />

      {/* ---------- CAMADA DE ROTAS (linhas) ---------- */}
      {/* Troque "data={rotas}" pela sua fonte real se quiser
          carregar de uma API/arquivo em vez de dado fixo aqui */}
      <GeoJSONSource id="rotasSource" data={rotas}>
        <Layer
          type="line"
          id="rotasLinha"
          paint={{
            'line-color': ['get', 'color'],

            'line-opacity': selectedLineId
              ? [
                'case',
                ['==', ['get', 'id'], selectedLineId],
                1,
                0.15
              ]
              : 0.7,

            'line-width': selectedLineId
              ? [
                'case',
                ['==', ['get', 'id'], selectedLineId],
                3,
                2,
              ]
              : 2,

            'line-offset': ['get', 'offset'],
          }}
          layout={{
            'line-cap': 'round',
            'line-join': 'round',
          }}
        />
      </GeoJSONSource>

      {/* ---------- CAMADA DE MARCOS (pontos) ---------- */}
      <GeoJSONSource id="marcosSource" data={marcos}>
        <Layer
          type="circle"
          id="marcosPontos"
          paint={{
            'circle-radius': 6,
            'circle-color': '#cccccc',
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff',
          }}
        />
      </GeoJSONSource>
    </Map>

  );
}

export default CityMap;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});