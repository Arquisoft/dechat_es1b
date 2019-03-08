var splitChain;

function splitMessage(msg){
	splitChain = msg.split("");
}

function encryptor(msg){
  splitMessage(msg);
	return convert();
}

function convert(){
  var tr="";
  var i;
  for (i = 0; i < splitChain.length; i++) {
    var temp = splitChain[i].charCodeAt(0);
    if(temp !== 32)
      splitChain[i] = String.fromCharCode(temp+1);
    tr += splitChain[i];
  }
  return tr;
}

exports.encryptor = encryptor;
