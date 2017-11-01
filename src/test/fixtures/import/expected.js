module.exports = {
  replacements: [
    {
      from: {
        module: "auth-plug",
        exportType: "named",
        specifier: "authPlug"
      },
      to: {
        module: "auth-plug",
        exportType: "named",
        specifier: "authority"
      }
    }
  ]
};
