import { franc, francAll } from 'franc'
import langs from 'langs'
import colors from 'colors'
const input = process.argv[2]
const langCode = franc(input)

colors.setTheme({
	custom: ['bgBlue', 'white', 'bold', 'underline']
})

if (langCode === 'und') {
	console.log('Could not retrieve data'.bgRed);
} else {
	const language = langs.where("3", langCode);
	console.log(`Our best guess is: ${language.name}`.custom)
}