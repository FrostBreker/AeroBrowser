const electronDl = require('electron-dl');

module.exports.init = (mainWindow, mainWebContents) => {
    console.log(`[INIT] --> Starting utils...`);
    electronDl(
        {
            saveAs: true,
            dialogOptions: {
                title: 'Save file',
                buttonLabel: 'Save',
                nameFieldLabel: 'File name',
            },
            onStarted: item => {
                item.on("updated", (event, state) => {
                    if (state === "interrupted") {
                        console.log("Download is interrupted but can be resumed");
                    } else if (state === "progressing") {
                        if (item.isPaused()) {
                            console.log("Download is paused");
                        } else {
                            console.log(`Received bytes: ${item.getReceivedBytes()}`);
                            console.log(`Total bytes: ${item.getTotalBytes()}`);
                            console.log(`Progress: ${parseInt(item.getReceivedBytes() / item.getTotalBytes() * 100)}%`);
                            const downloadedBytes = this.convertBytesToHumanReadable(item.getReceivedBytes())
                            const totalBytes = this.convertBytesToHumanReadable(item.getTotalBytes())
                            const speed = this.convertBytesToHumanReadable((Date.now() - item.getStartTime()) / item.getReceivedBytes())
                            console.log(speed);
                            console.log(item.getReceivedBytes() / (Date.now() - item.getStartTime()));
                            console.log(`Downloaded: ${downloadedBytes.size}/${totalBytes.size} ${totalBytes.unit} - ${speed.size}${speed.unit}/s`);
                        }
                    }
                })
            },
        }
    );
};

module.exports.convertBytesToHumanReadable = (bytes) => {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) {
        return "0 Bytes";
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return {
        size: Math.round(bytes / Math.pow(1024, i)),
        unit: sizes[i]
    }
};