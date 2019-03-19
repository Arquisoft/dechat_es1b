const fileClient = require('solid-file-client');
	/**
     * Deletes the file with the given URL
     * @param {String} url 
     * @return {Promise} file
     */
    deleteFile(url) {
        return fileClient.deleteFile(url).then(() => 200);
    }

    /**
     * Read the url file
     * @return {Promise} file
     */
    readFile(url) {
        return fileClient.readFile(url);
    }

    module.exports = {
    deleteFile
}