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
import linesData from '@/data/lines.json';
import { Bounds } from '@/types/bounds';
import { MarkerGeoJSON, RouteGeoJSON } from '@/types/geojson';
import { Line } from '@/types/lines';

// ============================================================
// CONFIGURAÇÃO DO MAPA — limites e centro inicial da cidade
// ============================================================
const BOUNDS = boundsData as Bounds;
const LINES = linesData as Line[];

// ============================================================
// DADOS DAS ROTAS — novas rotas adicionadas aqui
// ============================================================
//
// Cada rota é um "Feature" do tipo LineString: uma lista de pontos
// [longitude, latitude] na ordem em que a linha deve ser desenhada.
// Uma FeatureCollection pode ter várias rotas ao mesmo tempo — é só
// adicionar mais objetos dentro do array "features".
//
// Dica: para pegar coordenadas reais, use o site geojson.io — dá
// pra desenhar a linha visualmente no mapa e copiar o JSON gerado.

const rotas: RouteGeoJSON = {
    type: 'FeatureCollection' as const,
    features: LINES.map((line) => ({
      type: 'Feature',
      properties: {
        id: line.id,
        name: line.name,
        color: line.color
      },
      geometry: {
        type: 'LineString',
        coordinates: line.route.coordinates
      }
    }))
};

const startPoint = LINES[0].stops[0];
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


const CityMap = () => {
    const cameraRef = useRef<CameraRef>(null);

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
              'line-width': 3,
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