module.exports = {
  operation: "replace-module",
  to: "lib-mongo-proxy",
  specifiers: [
    {
      type: "ImportDefaultSpecifier",
      local: {
        type: "Identifier",
        name: "mongo"
      }
    },
  ]
};
