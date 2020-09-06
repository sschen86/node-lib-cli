import resolve from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs' // 将CommonJS模块转换成ES6，防止他们在Rollup中失效;
import buble from '@rollup/plugin-buble' // ES6转ES5插件;
import json from '@rollup/plugin-json'
// import { terser } from 'rollup-plugin-terser'  //js压缩;
import serve from 'rollup-plugin-servex' // serve服务;
import node from 'rollup-plugin-node-builtins'
import nodeGlobals from 'rollup-plugin-node-globals'
// import { babel } from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import livereload from 'rollup-plugin-livereload' // 热更新;

import external from './external'

export default {
  input: './playground/index.js', // 入口文件
  output: { // 出口文件
    file: './temp/index.bundle.js',
    format: 'iife',
    name: 'playground',
    sourcemap: true,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    cjs(),
    resolve({
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: 'node_modules',
      },
    }),
    // babel({
    //     presets: [
    //         '@babel/preset-env',
    //         '@babel/preset-react',
    //     ],
    //     plugins: [
    //         '@babel/plugin-proposal-class-properties',
    //     ],
    //     // exclude: 'node_modules/**', // 只编译源代码
    //     // runtimeHelpers: true,
    // }),
    json(),
    buble({
      objectAssign: 'Object.assign',
      transforms: {
        asyncAwait: false,
      },
    }),
    node(),
    nodeGlobals(),
    // terser(),
    serve({
      open: true,
      contentBase: [ './playground', './temp' ], // 启动文件夹;
      host: 'localhost', // 设置服务器;
      port: 8000, // 端口号;
      beforeResponse ({ request, response, content, error }) {
        // response.end('xxx')
        // return false
      },
    }),
    livereload({
      watch: [ './playground/', './temp/' ], // 监听文件夹
    }),
  ],
  external,
}
