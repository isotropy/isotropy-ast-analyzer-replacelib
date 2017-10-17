import path from "path";

export default function analyzeImportDeclaration(
  babelPath,
  state,
  analysisState = { importBindings: [] }
) {
  // Incorrect config
  if (!state.opts.projects) return false;

  const moduleName = babelPath.get("source").node.value;

  const currentFile = path.resolve(state.file.opts.filename);

  const importProject = state.opts.projects.find(project =>
    currentFile.includes(project.dir)
  );

  // Not an import project
  if (!importProject) return false;

  const importReplacement = importProject.imports.find(
    module => module.from === moduleName
  );

  const specifiers = babelPath
    .get("specifiers")
    .reduce(
      (output, specifier) => output.concat(specifier.node.local.name),
      []
    );

  const source = babelPath.get("source").node.value;

  const specifierType = babelPath.get("specifiers.0").node.type;

  debugger;

  return {
    source,
    specifierType,
    specifiers,
    importReplacement
  };
}
