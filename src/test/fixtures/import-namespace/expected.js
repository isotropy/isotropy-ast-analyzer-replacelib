module.exports = {
  operation: "replace-module",
  to: "lib-mongo-proxy",
  specifiers: [
    {
      type: "ImportNamespaceSpecifier",
      local: {
        type: "Identifier",
        name: "mongo"
      }
    },
  ]
};
