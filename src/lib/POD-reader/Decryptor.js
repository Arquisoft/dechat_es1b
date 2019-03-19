var splitChain;

/**
 * Separate the message letter by letter
 * @param {String} message
 */
function splitMessage(msg){
	splitChain = msg.split("");
}

/**
 * Change each character by its previous in ASCII
 * @return {String} decrypted message
 */
function deConvert(){
  var tr="";
  var i;
  for (i = 0; i < splitChain.length; i++) {
      var temp = splitChain[i].charCodeAt(0);
      if(temp !== 32){
        splitChain[i] = String.fromCharCode(temp-1);
    }
    tr += splitChain[i];
  }
  return tr;
}

/**
 * This function decrypt the message
 * @param {String} message
 * @return {String} decrypted message
 */
function decryptor(msg){
  splitMessage(msg);
  return deConvert();
}

exports.decryptor = decryptor;
