import should from "should";
import * as babel from "babel-core";
import fs from "fs";
import path from "path";
import makePlugin from "./plugin";
import sourceMapSupport from "source-map-support";
import * as utils from "isotropy-plugin-dev-utils";
import { Match, Skip, Fault, Empty } from "chimpanzee";

sourceMapSupport.install();

describe("isotropy-ast-analyzer-filesystem", () => {
  function run([description, dir, resultType, opts]) {
    it(`${description}`, () => {
      const fixturePath = path.resolve(
        __dirname,
        "fixtures",
        dir,
        `fixture.js`
      );

      const pluginInfo = makePlugin(opts);

      const callWrapper = () => {
        babel.transformFileSync(fixturePath, {
          plugins: [
            [
              pluginInfo.plugin,
              {
                projects: [
                  {
                    dir: "dist/test",
                    modules: [
                      {
                        from: "lib-mongo",
                        to: "lib-mongo-proxy"
                      }
                    ]
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
        return pluginInfo.getResult();
      };

      const expected = require(`./fixtures/${dir}/expected`);
      const result = callWrapper();
      const actual = result.analysis;

      if (resultType === "match") {
        actual.should.be.an.instanceOf(Match);
        const cleaned = utils.astCleaner.clean(actual.value);
        cleaned.should.deepEqual(expected);
      } else if (resultType === "empty") {
        actual.should.be.an.instanceOf(Empty);
      } else if (resultType === "skip") {
        actual.should.be.an.instanceOf(Skip);
        actual.message.should.equal(expected.message);
      } else if (resultType === "fault") {
        actual.should.be.an.instanceOf(Fault);
        actual.message.should.equal(expected.message);
      }
    });
  }

  const tests = [
    ["import", "import"],
  ];

  for (const test of tests) {
    run(test);
  }
});
