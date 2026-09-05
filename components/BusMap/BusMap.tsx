import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import {
    Map,
    Camera,
    GeoJSONSource,
    Layer,
    type CameraRef,
} from '@maplibre/maplibre-react-native';

// ============================================================
// CONFIGURAÇÃO DO MAPA — limites e centro inicial de Birigui
// ============================================================

// Bounding box que trava o pan/zoom: [west, south, east, north]
// Se quiser liberar mais área, aumente esses valores (west/south
// diminuem, east/north aumentam)
const BIRIGUI_BOUNDS: [number, number, number, number] = [
    -50.375, -21.325, -50.280, -21.250,
];

// Posição onde o mapa abre. Formato sempre [longitude, latitude]
// (repare que é ao contrário do "lat, lon" que a gente costuma falar)
const BIRIGUI_CENTER: [number, number] = [-50.34, -21.2886];

// ============================================================
// DADOS DAS ROTAS — é AQUI que você adiciona novas rotas
// ============================================================
//
// Cada rota é um "Feature" do tipo LineString: uma lista de pontos
// [longitude, latitude] na ordem em que a linha deve ser desenhada.
// Uma FeatureCollection pode ter várias rotas ao mesmo tempo — é só
// adicionar mais objetos dentro do array "features".
//
// Dica: para pegar coordenadas reais, use o site geojson.io — dá
// pra desenhar a linha visualmente no mapa e copiar o JSON gerado.

const rotas = {
    type: 'FeatureCollection' as const,
    features: [
        {
        type: 'Feature' as const,
        // "properties" pode guardar qualquer metadado da rota
        // (nome, cor, status etc.) — útil se depois você quiser
        // estilizar cada rota de forma diferente
        properties: { nome: 'Rota exemplo' },
        geometry: {
            type: 'LineString' as const,
            coordinates: [
            [-50.352, -21.298],
            [-50.345, -21.292],
            [-50.338, -21.288],
            [-50.330, -21.283],
            [-50.322, -21.280],
            ],
        },
        },
        // Para adicionar uma segunda rota, copie o bloco acima e cole
        // aqui embaixo, com properties/coordinates diferentes. Exemplo:
        //
        // {
        //   type: 'Feature' as const,
        //   properties: { nome: 'Rota do centro ao bairro X' },
        //   geometry: {
        //     type: 'LineString' as const,
        //     coordinates: [
        //       [-50.340, -21.290],
        //       [-50.335, -21.285],
        //     ],
        //   },
        // },
    ],
};

// ============================================================
// MARCOS (início/fim/paradas) — pontos sobre as rotas
// ============================================================
//
// Cada marco é um Feature do tipo Point (um único par de coordenadas).
// "properties.tipo" é livre — você usa esse valor depois se quiser
// dar cores/ícones diferentes por tipo de marco.

const marcos = {
    type: 'FeatureCollection' as const,
    features: [
        {
        type: 'Feature' as const,
        properties: { tipo: 'inicio' },
        geometry: { type: 'Point' as const, coordinates: [-50.352, -21.298] },
        },
        {
        type: 'Feature' as const,
        properties: { tipo: 'fim' },
        geometry: { type: 'Point' as const, coordinates: [-50.322, -21.280] },
        },
        // Novo marco/parada? Copie um dos blocos acima e ajuste
        // "tipo" e "coordinates".
    ],
};

const BusMap = () => {
    const cameraRef = useRef<CameraRef>(null);

    return (
      <Map
        style={styles.map}
        mapStyle="https://tiles.openfreemap.org/styles/positron"
        // Garante que o mapa abre centralizado em Birigui, mesmo
        // com maxBounds ativo no Camera (ver comentário do Camera)
        onDidFinishLoadingMap={() => {
          cameraRef.current?.jumpTo({ center: BIRIGUI_CENTER, zoom: 13 });
        }}
      >
        {/* Controla zoom/limites — não desenha nada visualmente */}
        <Camera
          ref={cameraRef}
          minZoom={12}
          maxZoom={18}
          maxBounds={BIRIGUI_BOUNDS}
        />

        {/* ---------- CAMADA DE ROTAS (linhas) ---------- */}
        {/* Troque "data={rotas}" pela sua fonte real se quiser
            carregar de uma API/arquivo em vez de dado fixo aqui */}
        <GeoJSONSource id="rotasSource" data={rotas}>
          <Layer
            type="line"
            id="rotasLinha"
            paint={{
              'line-color': '#e11d48', // cor da linha
              'line-width': 4,         // espessura em pixels
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
              'circle-color': '#e11d48',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#ffffff',
            }}
          />
        </GeoJSONSource>

        {/* Quer uma camada nova (ex: áreas/polígonos, outro tipo de
            rota com cor diferente)? Adicione outro par
            <GeoJSONSource> + <Layer> aqui, com um "id" único para
            cada um. */}
      </Map>

    );
}

export default BusMap;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});