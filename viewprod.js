var contractAbi=[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "Added",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_productId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "designation",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "companyName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "Location",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "info",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "date",
				"type": "string"
			}
		],
		"name": "addState",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_p_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_date",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "producer_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "price_p",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location_prod",
				"type": "string"
			}
		],
		"name": "newItem",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_productId",
				"type": "uint256"
			}
		],
		"name": "searchProduct",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

var addr = "0x597B9ccd278731fA7D4Aa650e02F51C7A3Ba6239";
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
	web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
  } else {
	web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
  }

var contract = new web3.eth.Contract(contractAbi, addr);

document.getElementById('pname').disabled=true;
document.getElementById('prodname').disabled=true;
document.getElementById('prodloc').disabled=true;
document.getElementById('manu').disabled=true;
document.getElementById('desc').disabled=true;

document.getElementById('getid').onclick=function(event){
	prodID = document.getElementById('pid').value;
	prod=parseInt(prodID);
	event.preventDefault();
	web3.eth.getAccounts().then(async function(accounts){
		contract.methods.searchProduct(prod).call().then(function (ans){
			var val = ans;
			console.log(ans);
			var list = val.split(",");
			document.getElementById('pname').value=list[0];
			document.getElementById('prodname').value=list[1];
			var list1 = list[2].split("~");
			// console.log(list1[1])
			document.getElementById('prodloc').value=list1[0];
			// console.log(list1[0]);
			 var list2 = list1[1].split("$");
			 // console.log(list2[0]);
			document.getElementById('manu').value=list2[0];
			// document.getElementById('desc').value=list2[1];
			var info = ""
			for(let i=1;i<list2.length;i++)
			{
				info = list2[i].concat(info);
				info = info.concat("\n");
			}
			document.getElementById('desc').value=info;


		});
	});
}