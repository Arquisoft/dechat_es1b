const fileClient = require('solid-file-client');
	/**
     * Deletes the file with the given URL
     * @param {String} url 
     * @return {Promise} file
     */
    deleteFile(url) {
        return fileClient.deleteFile(url).then(() => 200);
    }

    module.exports = {
    deleteFile
}