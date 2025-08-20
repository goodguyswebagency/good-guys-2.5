import finsweetConfigs from "@finsweet/eslint-config";

export default [
   ...finsweetConfigs,
   {
      rules: {
         "no-undef": "off",
         "prefer-destructuring": "off",
         "no-unused-vars": "off",
         "@typescript-eslint/no-unused-vars": "off",
      },
   },
];
