const { bookmarks, downloads, tabs } = require("../storedData")

class CurrentStoredData {
    constructor() {
        console.log("[CurrentStoredData] --> Initializing current data");
        console.log("[CurrentStoredData] --> Starting to load current data");
        this.types = {
            bookmarksMap: 'bookmarks',
            downloadsMap: 'downloads',
            tabsMap: 'tabs'
        }

        Object.keys(this.types).forEach((type) => {
            this[type] = new Map()
        });


        this.bookmarksMap = new Map()
        this.downloadsMap = new Map()
        this.tabsMap = new Map()

        this.bookmarksJSON = bookmarks.get('bookmarks')
        this.downloadsJSON = downloads.get('downloads')
        this.tabsJSON = tabs.get('tabs')
        this.bookmarksJSON.forEach((bookmark) => {
            this.bookmarksMap.set(bookmark.id, bookmark)
        })
        this.downloadsJSON.forEach((download) => {
            this.downloadsMap.set(download.id, download)
        })
        this.tabsJSON.forEach((tab) => {
            this.tabsMap.set(tab.id, tab)
        })
        console.log("[CurrentStoredData] --> Finished to load current data");
    }

    isValidType(type) {
        return this.types.hasOwnProperty(type)
    }

    get(type) {
        if (!this.isValidType(type)) return 404;
        console.log(`[CurrentStoredData] --> Getting: ${type}`);
        return this.convertMapToArray(this[type])
    }

    getObject(type, id) {
        if (!this.isValidType(type)) return 404;
        console.log(`[CurrentStoredData] --> Getting: ${type} with id: ${id}`);
        return this[type].get(id)
    }

    add(type, data) {
        if (!this.isValidType(type)) return 404;
        this[type].set(data.id, data)
        console.log(`[CurrentStoredData] --> Adding: ${type} with id: ${data.id}`);
        return 201;
    }

    remove(type, id) {
        if (!this.isValidType(type)) return 404;
        this[type].delete(id)
        console.log(`[CurrentStoredData] --> Removing: ${type} with id: ${id}`);
        return 200;
    }

    update(type, data) {
        if (!this.isValidType(type)) return 404;
        this[type].set(data.id, data)
        console.log(`[CurrentStoredData] --> Updating: ${type} with id: ${data.id}`);
        return 200;
    }

    convertMapToArray(map) {
        return Array.from(map.values())
    }

    async updateCurrentToJSON() {
        console.log("[CurrentStoredData] --> Sarting to update current data to JSON");
        bookmarks.set('bookmarks', this.convertMapToArray(this.bookmarksMap))
        downloads.set('downloads', this.convertMapToArray(this.downloadsMap))
        tabs.set('tabs', this.convertMapToArray(this.tabsMap))
        console.log("[CurrentStoredData] --> Finished to update current data to JSON");
        return true;
    }
}

module.exports = CurrentStoredData