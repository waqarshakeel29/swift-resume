/** @type {import('next').NextConfig} */

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const nextConfig = {
    // Nextjs has an issue with pdfjs-dist which optionally uses the canvas package
    // for Node.js compatibility. This causes a "Module parse failed" error when
    // building the app. Since pdfjs-dist is only used on client side, we disable
    // the canvas package for webpack
    // https://github.com/mozilla/pdf.js/issues/16214
    output: 'standalone',
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    webpack: (config) => {
      // Setting resolve.alias to false tells webpack to ignore a module
      // https://webpack.js.org/configuration/resolve/#resolvealias
      config.resolve.alias.canvas = false;
      config.resolve.alias.encoding = false;
      return config;
    },
  };
  
export default nextConfig;
