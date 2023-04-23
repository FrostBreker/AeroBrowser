const { promisify } = require("util");
const { glob } = require("glob");
const { channels } = require("../constants");
const pGlob = promisify(glob);

module.exports = async (ipc, webContents) => {
    (await pGlob(`${process.cwd()}/public/ipc/*/*.js`)).map(async eventFile => {
        const event = require(eventFile);

        if (!(event.name in channels) || !event.name) {
            return console.log(`------\nEvenement non-déclenchée: erreur de typo (ou pas de nom)\nFichier --> ${eventFile}`);

        }

        if (event.once) {
            ipc.once(event.name, (...args) => event.execute(webContents, ...args));
        } else {
            ipc.on(event.name, (...args) => event.execute(webContents, ...args));
        }

        console.log(`events Charge [✅] : ${event.name}`);
    })
}