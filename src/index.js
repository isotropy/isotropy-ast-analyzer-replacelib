import path from "path";

export default function analyzeImportDeclaration(
  babelPath,
  state,
  analysisState = { importBindings: [] }
) {
  debugger;
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

  const specifier = babelPath.get("specifiers.0").node.local.name;
  analysisState.importBindings = analysisState.importBindings.concat({
    import: importReplacement,
    binding: babelPath.scope.bindings[specifier]
  });
  return importReplacement;
}
