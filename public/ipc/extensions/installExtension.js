const { channels, folders } = require("../../constants");
const fs = require('fs');
const path = require('path');
const CRX = require('crx');
const axios = require('axios');
const { extractCRX, exctractZip } = require("../../utils");

module.exports = {
    name: channels.INSTALL_EXTENSION,
    once: true,
    async execute(webContents, _, extId) {
        const extensionUrl = `https://clients2.google.com/service/update2/crx?response=redirect&prodversion=${process.versions.chrome}&acceptformat=crx3&x=id%3D${extId}%26installsource%3Dondemand%26uc`;
        const extensionsFolder = folders.extensionsFolder;
        const extensionFile = path.join(extensionsFolder, `${extId}.zip`);
        const extensionFolder = path.join(extensionsFolder, extId);

        console.log(`[✅] Installing extension: (${extId})`);

        try {
            // Create the extensions folder if it doesn't exist
            if (!fs.existsSync(extensionsFolder)) {
                fs.mkdirSync(extensionsFolder, { recursive: true });
                console.log(`[✅] Extensions folder has been created: (${extensionsFolder})`);
            }

            // Download the extension as a binary stream with MIME headers
            const response = await axios.get(extensionUrl, {
                responseType: 'stream',
                headers: {
                    'Accept': 'application/octet-stream', // Specify the MIME type
                },
            });

            // Create a write stream to save the CRX file
            const writerStream = fs.createWriteStream(extensionFile);

            // Pipe the response data to the writer stream
            response.data.pipe(writerStream);

            // Wait for the download to complete
            await new Promise((resolve, reject) => {
                writerStream.on('finish', resolve);
                writerStream.on('error', reject);
            });

            console.log(`[✅] Extension has been downloaded: (${extensionFile})`);

            if (fs.existsSync(extensionFolder)) {
                await fs.promises.rmdir(extensionFolder, { recursive: true });
            }
            fs.mkdirSync(extensionFolder, { recursive: true });
            console.log(`[✅] Extension folder has been created: (${extensionFolder})`);

            console.log(extensionFile);
            console.log(extensionFolder);

            await exctractZip(extensionFile, extensionFolder);

            // Now that the download is complete, proceed with extraction
            // Extract the extension using unzipper
            // const extractionStream = fs.createReadStream(extensionFile).pipe(unzipper.Extract({ path: extensionFolder, forceStream: true }));

            // extractionStream.on('entry', (entry) => {
            //     // Log entry details
            //     console.log(entry);
            //     console.log(`[✅] Extracting entry: ${entry.path}`);
            // });

            // extractionStream.on('finish', () => {
            //     // Load the extension into the Electron session
            //     webContents.session.loadExtension(extensionFolder, {
            //         allowFileAccess: true,
            //     });
            //     console.log(`[✅] Extension has been installed: (${extId})`);
            // });

            // extractionStream.on('error', (error) => {
            //     console.error(`[❌] Error during extraction: ${error.message}`);
            // });
        } catch (error) {
            console.log(error);
            console.error(`[❌] Error installing extension: ${error.message}`);
        }
    }
}