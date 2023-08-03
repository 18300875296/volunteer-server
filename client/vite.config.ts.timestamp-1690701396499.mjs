// vite.config.ts
import { defineConfig } from "file:///C:/Users/jiu/Desktop/app_project/node_modules/.pnpm/vite@4.1.1_edl3ajnhen4c5iqs57t4gqrzly/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/jiu/Desktop/app_project/node_modules/.pnpm/@vitejs+plugin-vue@4.0.0_vite@4.1.1+vue@3.2.47/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { viteMockServe } from "file:///C:/Users/jiu/Desktop/app_project/node_modules/.pnpm/vite-plugin-mock@2.9.6_zyctm5jtnp3bl4irkvjpf4f3za/node_modules/vite-plugin-mock/dist/index.js";
import * as path from "path";
import AutoImport from "file:///C:/Users/jiu/Desktop/app_project/node_modules/.pnpm/unplugin-auto-import@0.15.3_rollup@3.18.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Users/jiu/Desktop/app_project/node_modules/.pnpm/unplugin-vue-components@0.24.1_rollup@3.18.0+vue@3.2.47/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///C:/Users/jiu/Desktop/app_project/node_modules/.pnpm/unplugin-vue-components@0.24.1_rollup@3.18.0+vue@3.2.47/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "C:\\Users\\jiu\\Desktop\\app_project";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    viteMockServe({
      supportTs: false,
      mockPath: "./src/mock/",
      // 解析刚刚user.ts的位置
      localEnabled: true
    })
    // 是否开启开发环境),
  ],
  css: {
    preprocessorOptions: {
      // scss: {
      //   additionalData: `$injectedColor: orange;`,
      // },
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    //  设置别名
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "/src"),
      "@components": path.resolve(__vite_injected_original_dirname, "./src/components")
    }
  },
  server: {
    port: 8181,
    // 指定服务器端口
    strictPort: true
    // 设置 https 代理
    // proxy: {
    //   '/api': {
    //     target: 'http://121.41.176.103:8282',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  build: {
    commonjsOptions: {
      esmExternals: true
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxqaXVcXFxcRGVza3RvcFxcXFxhcHBfcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcaml1XFxcXERlc2t0b3BcXFxcYXBwX3Byb2plY3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2ppdS9EZXNrdG9wL2FwcF9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jayc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICB2dWUoKSxcbiAgICBBdXRvSW1wb3J0KHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxuICAgIH0pLFxuICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgc3VwcG9ydFRzOiBmYWxzZSxcbiAgICAgIG1vY2tQYXRoOiAnLi9zcmMvbW9jay8nLCAvLyBcdTg5RTNcdTY3OTBcdTUyMUFcdTUyMUF1c2VyLnRzXHU3Njg0XHU0RjREXHU3RjZFXG4gICAgICBsb2NhbEVuYWJsZWQ6IHRydWUsXG4gICAgfSksIC8vIFx1NjYyRlx1NTQyNlx1NUYwMFx1NTQyRlx1NUYwMFx1NTNEMVx1NzNBRlx1NTg4MyksXG4gIF0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIC8vIHNjc3M6IHtcbiAgICAgIC8vICAgYWRkaXRpb25hbERhdGE6IGAkaW5qZWN0ZWRDb2xvcjogb3JhbmdlO2AsXG4gICAgICAvLyB9LFxuICAgICAgbGVzczoge1xuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIC8vICBcdThCQkVcdTdGNkVcdTUyMkJcdTU0MERcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnL3NyYycpLFxuICAgICAgJ0Bjb21wb25lbnRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbXBvbmVudHMnKSxcbiAgICB9LFxuICB9LFxuXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDgxODEsIC8vIFx1NjMwN1x1NUI5QVx1NjcwRFx1NTJBMVx1NTY2OFx1N0FFRlx1NTNFM1xuICAgIHN0cmljdFBvcnQ6IHRydWUsXG5cbiAgICAvLyBcdThCQkVcdTdGNkUgaHR0cHMgXHU0RUUzXHU3NDA2XG4gICAgLy8gcHJveHk6IHtcbiAgICAvLyAgICcvYXBpJzoge1xuICAgIC8vICAgICB0YXJnZXQ6ICdodHRwOi8vMTIxLjQxLjE3Ni4xMDM6ODI4MicsXG4gICAgLy8gICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAvLyAgICAgcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgICAvLyAgIH0sXG4gICAgLy8gfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBjb21tb25qc09wdGlvbnM6IHtcbiAgICAgIGVzbUV4dGVybmFsczogdHJ1ZSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRSLFNBQVMsb0JBQW9CO0FBQ3pULE9BQU8sU0FBUztBQUNoQixTQUFTLHFCQUFxQjtBQUM5QixZQUFZLFVBQVU7QUFFdEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFQcEMsSUFBTSxtQ0FBbUM7QUFTekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixDQUFDO0FBQUEsSUFDbkMsQ0FBQztBQUFBLElBQ0QsY0FBYztBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBO0FBQUEsTUFDVixjQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUFBO0FBQUEsRUFDSDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJbkIsTUFBTTtBQUFBLFFBQ0osbUJBQW1CO0FBQUEsTUFDckI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBO0FBQUEsSUFFUCxPQUFPO0FBQUEsTUFDTCxLQUFVLGFBQVEsa0NBQVcsTUFBTTtBQUFBLE1BQ25DLGVBQW9CLGFBQVEsa0NBQVcsa0JBQWtCO0FBQUEsSUFDM0Q7QUFBQSxFQUNGO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNOLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFVZDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsaUJBQWlCO0FBQUEsTUFDZixjQUFjO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
