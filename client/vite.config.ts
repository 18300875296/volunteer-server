import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';
import * as path from 'path';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteMockServe({
      supportTs: false,
      mockPath: './src/mock/', // 解析刚刚user.ts的位置
      localEnabled: true,
    }), // 是否开启开发环境),
  ],
  css: {
    preprocessorOptions: {
      // scss: {
      //   additionalData: `$injectedColor: orange;`,
      // },
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    //  设置别名
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },

  server: {
    port: 8181, // 指定服务器端口
    strictPort: true,
    // https: true,
    // open: '/index.html',
    // proxy:{

    // }
  },
  // 设置 https 代理
  // proxy: {
  //   '/api': {
  //     target: 'your https address',
  //     changeOrigin: true,
  //     rewrite: (path) => path.replace(/^\/api/, ''),
  //   },
  // },
  // },
  build: {
    commonjsOptions: {
      esmExternals: true,
    },
  },
});
