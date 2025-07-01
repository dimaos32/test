import { defineConfig, sharpImageService } from 'astro/config'
import viteSassGlob from 'vite-plugin-sass-glob-import'
import icon from 'astro-icon'

export default defineConfig({
  devToolbar: { enabled: false },
  site: 'https://htmlonelove.github.io',
  compressHTML: false,
  output: 'static',
  publicDir: './public',
  build: {
    format: 'file',
    assets: 'assets',
    assetsPrefix: '.',
    inlineStylesheets: 'never',
    split: false // Ключевая настройка!
  },
  image: {
    service: sharpImageService()
  },
  integrations: [
    icon({
      iconDir: 'src/shared/assets/icons',
      svgoOptions: {
        plugins: ['preset-default']
      }
    })
  ],
  server: {
    open: './sitemap.html'
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern'
        }
      }
    },
    resolve: {
      alias: {
        '@': '/src',
        '@styles': '/src/shared/styles/global'
      }
    },
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        input: {
          // ТОЧКИ ВХОДА ДЛЯ TS ФАЙЛОВ!
          'index-ts': './src/shared/scripts/index.ts',
          'template-ts': './src/shared/scripts/template.ts',
          'index-css': './src/shared/styles/index.scss',
          'template-css': './src/shared/styles/template.scss'
        },
        output: {
          entryFileNames: 'assets/scripts/[name].js',
          chunkFileNames: 'assets/scripts/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name

            if (name === 'index-css.css') return 'index.css'
            if (name === 'template-css.css') return 'template.css'

            if (name && name.match(/\.(png|jpe?g|gif|svg|webp)$/i)) {
              return 'assets/images/[name].[hash][extname]'
            }

            if (name && name.match(/\.(woff2?|ttf|eot)$/i)) {
              return 'assets/fonts/[name].[hash][extname]'
            }

            return 'assets/[name][extname]'
          }
        }
      }
    },
    plugins: [viteSassGlob()]
  }
})
