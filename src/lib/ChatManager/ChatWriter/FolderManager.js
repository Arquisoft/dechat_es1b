const fileClient = require('solid-file-client');
const MESSAGE_FILE = "messages.txt";
const DECHAT_FOLDER = "dechat_es1b";
const txtFileBuilder = require("./TextFileBuilder");

/**
 * Grant the necessary permissions to read a file with messages
 * @param {String} route of the file  
 * @param {String} webID of the partner
 */
async function grantReadPermissionsToFileWithMessages(fileRoute, partnerID) {
    var aclRoute = fileRoute + ".acl";
    var aclContents = txtFileBuilder.generateACL(partnerID, MESSAGE_FILE);
    await fileClient.updateFile(aclRoute, aclContents)
        .then(success => { 200 }, err => fileClient.createFile(aclRoute, aclContents).then(200));
};

/**
 * Grant the necessary permissions to read a file
 * @param {String} route of the file  
 * @param {String} webID of the partner
 * @param {String} file name 
 */
async function grantReadPermissionsToFile(fileRoute, partnerID, fileName) {
    var aclRoute = fileRoute + ".acl";
    var aclContents = txtFileBuilder.generateACL(partnerID, fileName);
    await fileClient.updateFile(aclRoute, aclContents)
        .then(success => { 200 }, err => fileClient.createFile(aclRoute, aclContents).then(200));
};

/**
 * Deletes the content of the folder specified by url, assuming the logged user has the rights to do so
 * @param {String} url 
 * @return {Promise} files
 */
function emptyFolder(url) {
    return this.getFilesFromFolder(url).then((files) => {
        for (const file of files) {
            this.deleteFile(file.url)
        }
    }).catch("Couldn't empty the folder")
};

/**
 * Gets the files inside a folder
 * @param {String} url 
 * @return {Promise} files
 */
function getFilesFromFolder(url) {
    return fileClient.readFolder(url).then((result) => {
        return result.files;
    })
};

/**
* Returns the url of the chat folder 
* @return {String} url 
*/
async function getUrlFolder(sessionURL) {
    var splitId = sessionURL.split("/");
    var urlFolder = splitId[0] + splitId[1] + splitId[2];
    return urlFolder;
};

/**
 * Creates a folder using the url
 * @param {String} url folder
 */
async function createFolder(url) {
    await fileClient.createFolder(url);
};

/**
 * Check if the pod has the dechat folder
 * If not, creates the folder of the chat, and a folder for the files
 * @param {String} url folder
 */
async function checkDechatFolder(userUrl) {
    let folder = userUrl + "/" + DECHAT_FOLDER;
    let check = await this.readFolder(folder);
    console.log("FOLDER NAME: " + check);
    if (typeof check === 'undefined') {
        await this.createFolder(folder);
    }
};

/**
 * Reads a folder using the url
 * @param {String} url folder
 * @return {Promise} Object promise if exist or undefined if not
 */
async function readFolder(url) {
    console.log("VOY A LEER: " + url)
    return fileClient.readFolder(url).then(folder => {
        console.log("YAY " + folder) 
        return (folder);
     }, err => undefined);
};

/**
* Check if a determinate folder or file exists or is accesible
* @Param {String} uri to validate its existence
* @return {Boolean} true if exists, false in other case
*/
async function validate(uriToValidate) {
    let result = await validate(uriToValidate);
    return result;
};

module.exports = {
    grantReadPermissionsToFileWithMessages,
    grantReadPermissionsToFile,
    emptyFolder,
    getFilesFromFolder,
    createFolder,
    readFolder,
    validate,
    checkDechatFolder,
    getUrlFolder,
    DECHAT_FOLDER
}