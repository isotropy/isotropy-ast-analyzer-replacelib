import path from "path";

export default function (analysisState) {
  return {
    analyzeImportDeclaration(babelPath, state) {
      return !state.opts.projects
        ? false
        : (() => {
          const project = state.opts.projects.find(project => {
            const projectDir = project.dir.startsWith("./")
              ? project.dir
              : "./" + project.dir;
            const absolutePath = path.resolve(projectDir);
            return state.file.opts.filename.startsWith(absolutePath);
          });

          return !project
            ? false
            : (() => {
              const moduleName = babelPath.get("source").node.value;
              const resolvedName = path.resolve(
                path.dirname(state.file.opts.filename),
                moduleName
              );

              const module = project.modules.find(m => {
                const sourceDir = m.source.startsWith("./")
                  ? m.source
                  : "./" + m.source;
                const absolutePath = path.resolve(sourceDir);
                return absolutePath === resolvedName;
              });

              return !module
                ? false
                : (() => {
                  const specifiers = babelPath.get("specifiers").node
                    .local.name;
                  return new {
                    to: module.to,
                    specifiers,
                    operation: "replace-module"
                  }
                  return true;
                })();
            })();
        })();
    }
  };
}
