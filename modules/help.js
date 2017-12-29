
const glob = require('glob')
const path = require('path')

module.exports = {
	help: 'A super helpful dude!',
	run: function (message) {
		glob('./modules/*.js', function (err, files) {
			let output = ''
			for (let i = 0; i < files.length; i++) {
				const filename = path.basename(files[i]).replace('.js', '')
				const mod = require('./' + path.basename(files[i]))
				output += `\`${filename}\`: `
				if (mod.help) {
					output += mod.help
				} else {
					output += 'No help text provided'
				}
				output += '\n'
			}
			message.reply(output)
		})
	}
}