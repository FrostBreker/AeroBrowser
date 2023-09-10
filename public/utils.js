const AdmZip = require('adm-zip');
const CRX = require('crx');
const yauzl = require('yauzl');
const fs = require('fs');
const path = require('path');

const unzipper = require('unzipper');

module.exports.extractCRX = async (crxFilePath, targetFolder) => {
    try {
        // Create the target folder if it doesn't exist
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder, { recursive: true });
            console.log(`[✅] Target folder has been created: (${targetFolder})`);
        }

        // Extract the extension using unzipper
        await fs.createReadStream(crxFilePath)
            .pipe(unzipper.Extract({ path: targetFolder }))
            .on('entry', (entry) => {
                console.log(`[✅] Extracting entry: ${entry.path}`);
            })
            .promise();

        console.log(`[✅] Extension has been extracted: (${targetFolder})`);
    } catch (error) {
        console.error(`[❌] Error during extraction: ${error.message}`);
    }
};
module.exports.exctractZip = async (inputFilePath, outputDirectory) => {
    try {
        const zip = new AdmZip(inputFilePath);
        zip.extractAllTo(outputDirectory, true);
        console.log('Fichier CRX décompressé avec succès.');
    } catch (error) {
        console.error('Erreur lors de la décompression du fichier CRX :', error.message);
    }
};