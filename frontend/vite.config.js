export default {
	root: './',
	build: {
	  	outDir: '../server/public',
		rollupOptions: {
			input: {
				main: "./index.html",
				game: "./game.html",
				editor: "./editor.html"
			},
			output: {
				manualChunks(id) {
				  if (id.includes('node_modules')) {
					return id.toString().split('node_modules/')[1].split('/')[0].toString();
				  }
				},
			  }
		},
		optimizeDeps: {
			include: ['./src/game/adapters/OBTGameLauncher/OBTGameLauncher.ts'],
		}
	}
  }