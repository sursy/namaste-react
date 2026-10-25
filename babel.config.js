function replaceImportMeta() {
  return {
    visitor: {
      MetaProperty(path) {
        const isImportMeta =
          path.node.meta.name === "import" && path.node.property.name === "meta";
        if (isImportMeta) {
          path.replaceWithSourceString("({ url: 'http://localhost/' })");
        }
      },
    },
  };
}

module.exports = function (api) {
  const isTest = api.env("test");

  return {
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      ["@babel/preset-react", { runtime: "automatic" }],
    ],
    plugins: isTest ? [replaceImportMeta] : [],
  };
};
