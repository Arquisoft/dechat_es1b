var splitChain;
function decryptor(msg){
    splitMessage(msg);
	return deConvert();
}

function splitMessage(msg){
	splitChain = msg.split("");
}

function deConvert(){
var tr="";
var i;
for (i = 0; i < splitChain.length; i++) {
  var temp = splitChain[i].charCodeAt(0);
  if(temp != 32){
  splitChain[i] = String.fromCharCode(temp-1);
  }
  tr += splitChain[i];
}
return tr;
}

exports.decryptor = decryptor;
