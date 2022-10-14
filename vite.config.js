import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir)
}

const alias = {
  '@': pathResolve("src")
}

// https://vitejs.dev/config/
export default ({ command }) => {
  const prodMock = true;
  return {
    base: './',
    resolve: {
      alias
    },
    server: {
      port: 9527,
      host: '0.0.0.0'
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            
          }
        }
      }
    },
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && prodMock,
        watchFiles: true,
        injectCode: `
          import { setupProdMockServer } from '../mockProdServer';
          setupProdMockServer();
        `,
        logger: true,
      }),
    ]
  };
}
