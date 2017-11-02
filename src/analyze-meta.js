import path from "path";
import { Match } from "chimpanzee";

export default function(analysisState) {
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
                  const moduleName = babelPath.node.source.value;
                  const module = project.modules.find(
                    m => m.from === moduleName
                  );

                  return !module
                    ? false
                    : new Match({
                        to: module.to,
                        specifiers: babelPath.node.specifiers,
                        operation: "replace-module"
                      });
                })();
          })();
    }
  };
}
