var splitChain;

function splitMessage(msg) {
  splitChain = msg.split("");
}

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

function encryptor(msg) {
  splitMessage(msg);
  return convert();
}

exports.encryptor = encryptor;