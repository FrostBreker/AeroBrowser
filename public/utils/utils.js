const electronDl = require('electron-dl');
const { ipcMain } = require('electron');
const { downloads } = require('../storedData');
const { channels } = require('../constants');

class Utils {
    constructor() {
        this.mainWindow = null;
        this.mainWebContents = null;
        console.log('Utils loaded');
    }

    init() {
        electronDl(
            {
                saveAs: true,
                dialogOptions: {
                    title: 'Save file',
                    buttonLabel: 'Save',
                    nameFieldLabel: 'File name',
                },
                onStarted: item => {
                    const data = {
                        id: this.generateId(),
                        startTime: item.getStartTime(),
                        state: item.getState(),
                        data: {
                            savePath: item.getSavePath(),
                            urlChain: item.getURLChain(),
                            url: item.getURL(),
                            filename: item.getFilename(),
                            mimeType: item.getMimeType(),
                        },
                        dlData: {
                            downloadedBytes: item.getReceivedBytes(),
                            totalBytes: item.getTotalBytes(),
                            speed: 0,
                            isPaused: item.isPaused(),
                            isDone: false,
                            isInterrupted: false,
                        }
                    };
                    this.mainWebContents.send(channels.ADD_DOWNLOAD, data);
                    console.log(`[DOWNLOAD] --> Download started: ${item.getFilename()}`);
                    let totalBytes = item.getTotalBytes(); // Example total bytes to download
                    let startTime = Date.now(); // Example start time in milliseconds
                    let downloadedBytes = item.getReceivedBytes(); // Initialize downloaded bytes
                    let previousTime = startTime; // Initialize previous time for the first calculation
                    item.on("updated", (event, state) => {
                        data.state = state;
                        if (state === "interrupted") {
                            data.dlData.isInterrupted = true;
                            this.mainWebContents.send(channels.UPDATE_DOWNLOAD, data);
                        } else if (state === "progressing") {
                            function updateDownloadedBytes(newDownloadedBytes) {
                                let currentTime = Date.now();
                                let elapsedTime = (currentTime - previousTime) / 1000; // Convert to seconds

                                // Calculate speed based on the change in downloaded bytes and time elapsed
                                let speed = (newDownloadedBytes - downloadedBytes) / elapsedTime; // Speed in bytes per second
                                downloadedBytes = newDownloadedBytes; // Update downloaded bytes
                                previousTime = currentTime; // Update previous time
                                return speed;
                            }
                            data.data.savePath = item.getSavePath();
                            if (item.isPaused()) {
                                data.dlData.isPaused = true;
                                this.mainWebContents.send(channels.UPDATE_DOWNLOAD, data);
                            } else {
                                data.dlData.downloadedBytes = item.getReceivedBytes();
                                data.dlData.totalBytes = item.getTotalBytes();
                                data.dlData.speed = updateDownloadedBytes(item.getReceivedBytes());
                                this.mainWebContents.send(channels.UPDATE_DOWNLOAD, data);
                            }
                        }
                    })

                    item.on("done", (event, state) => {
                        data.state = state;
                        if (state === "completed") {
                            console.log("Download successfully");
                            data.dlData.isDone = true;
                            this.mainWebContents.send(channels.UPDATE_DOWNLOAD, data);
                            downloads.set('downloads', [...downloads.get('downloads'), data]);
                        } else {
                            console.log(`Download failed: ${state}`);
                        }
                    });
                }
            }
        );
    }

    setMainWindow(mainWindow) {
        this.mainWindow = mainWindow;
        this.mainWebContents = mainWindow.webContents;
        console.log('Utils mainWindow set');
    }

    convertBytesToHumanReadable(bytes) {
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        if (bytes === 0) {
            return "0 Bytes";
        }
        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return {
            size: Math.round(bytes / Math.pow(1024, i)),
            unit: sizes[i]
        }
    }

    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}

module.exports = Utils;