// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default withNuxt(
  // Your custom configs here
  eslintPluginPrettierRecommended,
  [
    {
      files: ["/app/pages/*.vue"],
      rules: {
        "vue/multi-word-component-names": "off",
      },
    },
  ],
);
