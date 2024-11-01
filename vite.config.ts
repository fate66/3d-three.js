import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      // 自动导入vue相关的Api
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          three: [
            // default imports
            ['*', 'THREE'] // import { * as THREE } from 'axios',
          ]
        }
      ],
      vueTemplate: true
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
