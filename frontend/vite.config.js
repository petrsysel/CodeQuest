export default {
	root: './',
	build: {
	  	outDir: '../server/public',
		rollupOptions: {
			input: {
				main: "./index.html",
				game: "./game.html",
				editor: "./editor.html"
			}
		},
		optimizeDeps: {
			include: ['./src/game/adapters/OBTGameLauncher/OBTGameLauncher.ts'],
		}
	}
  }