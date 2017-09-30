import analyzeImportDeclaration from "../";

export default function(opts) {
  let _analysis, _analysisState;

  function analyze(fn, path, state) {
    const analysis = fn(path, state);
    path.skip();
    if (analysis !== undefined) {
      _analysis = analysis;
    }
  }

  return {
    plugin: {
      visitor: {
        ImportDeclaration(path, state) {
          analyze(analyzeImportDeclaration, path, state);
          path.skip;
        }
      }
    },
    getResult: () => {
      return { analysis: _analysis };
    }
  };
}
