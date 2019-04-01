var splitChain;

/**
 * Separate the message letter by letter
 * @param {String} message
 */
function splitMessage(msg) {
  splitChain = msg.split("");
}

/**
 * Change each character by its next in ASCII
 * @return {String} encrypted message
 */
function convert() {
  var tr = "";
  var i;
  var temp;
  for (i = 0; i < splitChain.length; i++) {
    temp = splitChain[i].charCodeAt(0);
    if (temp !== 32) {
      splitChain[i] = String.fromCharCode(temp + 1);
    }
    tr += splitChain[i];
  }
  return tr;
}

/**
 * This function encrypt the message
 * @param {String} message
 * @return {String} encrypted message
 */
function encryptor(msg) {
  splitMessage(msg);
  return convert();
}

exports.encryptor = encryptor;
