import resolve from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import json from '@rollup/plugin-json'
// import { terser } from 'rollup-plugin-terser'
import hotserve from 'rollup-plugin-hotserve'
import node from 'rollup-plugin-node-builtins'
import nodeGlobals from 'rollup-plugin-node-globals'
// import { babel } from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'

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
            objectAssign: 'Object.assgin',
            transforms: {
                // asyncAwait: false
            },
        }),
        node(),
        nodeGlobals(),
        // terser(),
        hotserve({ // 使用开发服务插件
            port: 3001,
            // 设置 exmaple的访问目录和dist的访问目录
            contentBase: [ './playground', './temp' ],
            hotReload: /\\playground\\[^\\/]+\.js$/,
        }),
    ],
    // external: ['lodash']
}
