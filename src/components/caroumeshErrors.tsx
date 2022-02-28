export const ModelChildrenError = () => {
  throw new Error(
    'Cause:\n<Caroumesh/> only accepts <Model/> and <Lights/> components... for now !\nFix:\nRemove any React components or text other than the mentionned inside of the <Caroumesh/> component.'
  );
};

export const LightsChildrenError = () => {
  throw new Error(
    'Cause:\n<Lights/> only accepts <spotLight/>, <pointLight/>, <rectAreaLight/>, <hemisphereLight/>, <directionalLight/> and <ambientLight/> components !\nFix:\nRemove any other React components or text than the mentionned inside of the <Lights/> component.'
  );
};
