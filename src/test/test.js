import should from "should";
import * as babel from "babel-core";
import fs from "fs";
import path from "path";
import makePlugin from "./plugin";
import sourceMapSupport from "source-map-support";

sourceMapSupport.install();

function clean(obj) {
  if (typeof obj !== "object") {
    return obj;
  } else {
    if (Array.isArray(obj)) {
      return obj.map(o => clean(o));
    } else {
      const newObj = {};
      for (const key in obj) {
        if (
          ![
            "start",
            "end",
            "loc",
            "computed",
            "shorthand",
            "extra",
            "__clone",
            "path"
          ].includes(key)
        ) {
          newObj[key] = clean(obj[key]);
        }
      }
      return newObj;
    }
  }
}

describe("isotropy-ast-analyzer-replacelib", () => {
  function run([description, dir, opts]) {
    it(`${description}`, () => {
      const fixturePath = path.resolve(
        __dirname,
        "fixtures",
        dir,
        `fixture.js`
      );
      const outputPath = path.resolve(__dirname, "fixtures", dir, `output.js`);
      const expected = require(`./fixtures/${dir}/expected`);
      const pluginInfo = makePlugin(opts);

      const babelResult = babel.transformFileSync(fixturePath, {
        plugins: [
          [
            pluginInfo.plugin,
            {
              projects: [
                {
                  dir: "dist/test",
                  imports: [{ from: "auth-plug", to: "server-auth-plug" }]
                }
              ]
            }
          ],
          "transform-object-rest-spread"
        ],
        parserOpts: {
          sourceType: "module",
          allowImportExportEverywhere: true
        },
        babelrc: false
      });
      const result = pluginInfo.getResult();
      const actual = clean(result.analysis);
      actual.should.deepEqual(expected);
    });
  }

  [
    ["import", "import"],
    ["import-default", "import-default"],
    ["import-namespace", "import-namespace"]
  ].forEach(test => run(test));
});
