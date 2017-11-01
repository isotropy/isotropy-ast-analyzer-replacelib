import meta from "./analyze-meta";

function makeAnalysisState() {
  return {
    importBindings: []
  };
}

export default function() {
  const state = makeAnalysisState();
  return {
    meta: meta(state),
  };
}
