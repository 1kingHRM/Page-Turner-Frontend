/** @type {import('next').NextConfig} */

const nodeExternals = require("webpack-node-externals");

module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = ["react-pdf", ...config.externals];
      config.externalsPresets = { node: true };
    }

    return config;

    return config;
  },
};
