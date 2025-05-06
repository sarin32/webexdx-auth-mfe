import {merge} from 'webpack-merge';
import singleSpaDefaults from 'webpack-config-single-spa-react-ts';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'webexdx',
    projectName: 'auth',
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    devServer: {
      port: 9001,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                compilerOptions: {
                  module: 'esnext',
                },
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: ['postcss-loader'],
        },
      ],
    },
  });
};
