module.exports = {
  source: "auth-plug",
  specifierType: "ImportSpecifier",
  specifiers: ["authPlug", "authority"],
  importReplacement: { from: "auth-plug", to: "server-auth-plug" }
};
