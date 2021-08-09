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
				"name": "price_m",
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
			}
		],
		"name": "addState",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
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

var addr = "0xDCc6A459C2E0A3a53b32725AB18EA19253eB7391";
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
	web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
  } else {
	web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
  }

var contract = new web3.eth.Contract(contractAbi, addr);

document.getElementById('dist').onclick=function(event)
{
	event.preventDefault();
	//pname,pdate,manName
	var ProductID=document.getElementById('product_id').value;
	var Present_date=document.getElementById('date').value;
	var Designition=document.getElementById('designation').value;
	var Company_name = document.getElementById('price').value;
	var Location = document.getElementById('location').value;
	var Description = document.getElementById('desc').value;
	web3.eth.getAccounts().then(async function(accounts) {
		contract.methods.addState(ProductID,Designition,Company_name,Location, Description, Present_date).send({from:accounts[1],gas:3000000}).then(
			function(des){
				if(des.status===true)
				{
					alert("Description added Successfully");
				}
			// console.log(ret);
			}
		)
})
}