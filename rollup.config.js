import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

// From https://github.com/ReactTraining/react-router/blob/95a150c8d1c08e8b07d280c5b1f23183120eb1ad/packages/react-router/rollup.config.js#L13
function external(id) {
  return ! id.startsWith('.') && ! id.startsWith('/');
}

// noinspection JSUnusedGlobalSymbols
export default {
  external,
  input: './src/index.js',
  plugins: [
    babel({ exclude: 'node_modules/**' }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    nodeResolve(),
    commonjs()
  ],
  output: {
    file: './dist/index.js',
    format: 'cjs',
    exports: 'named',
    globals: { react: 'React' }
  },
}
