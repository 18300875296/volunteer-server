import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { viteMockServe } from 'vite-plugin-mock';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
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
    modules: {
      localsConvention: 'camelCase',
      scopeBehaviour: 'local',
      generateScopedName(name) {
        return name;
      },
      globalModulePaths: [],
    },
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
      '@': path.resolve(__dirname, './src'), // 设置别名 @ 为项目根目录的 src 文件夹
      '@components': path.resolve(__dirname, './src/components'), // 设置别名 @components 为 src/components 文件夹
      '@views': path.resolve(__dirname, './src/views'), // 设置别名 @views 为 src/views 文件夹
      '@api': path.resolve(__dirname, './src/api'),
      '@store': path.resolve(__dirname, './src/store'),
      '@router': path.resolve(__dirname, './src/router/index.ts'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
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
    sourcemap: true,
    commonjsOptions: {
      esmExternals: true,
    },
  },
});
