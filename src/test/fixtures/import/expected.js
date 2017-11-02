module.exports = {
  operation: "replace-module",
  to: "lib-mongo-proxy",
  specifiers: [
    {
      type: "ImportSpecifier",
      imported: {
        type: "Identifier",
        name: "fetch"
      },
      local: {
        type: "Identifier",
        name: "fetch"
      }
    },
    {
      type: "ImportSpecifier",
      imported: {
        type: "Identifier",
        name: "save"
      },
      local: {
        type: "Identifier",
        name: "save"
      }
    }
  ]
};
