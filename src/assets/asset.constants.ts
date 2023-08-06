import { CaroumeshProps } from 'src/components/Caroumesh/Caroumesh';

export const SRC_STAR_DESTROYER = 'src/assets/StarDestroyer.gltf';
export const SRC_TIE_FIGHTER = 'src/assets/TieFighter.gltf';

export const ASSETS_EXAMPLE_PROPS: CaroumeshProps = {
  scenes: [
    {
      src: SRC_STAR_DESTROYER,
      scale: 0.05,
      lightIntensity: 0.01,
    },
    { src: SRC_TIE_FIGHTER, scale: 3 },
  ],
  controls: true,
  shadows: true,
  debugOptions: {
    gizmos: false,
  },
};
