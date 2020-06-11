var Decimal = require("decimal.js");
Decimal8 = Decimal.clone({ precision:1, rounding:1 });

var currencyUnits = [
	{
		type:"native",
		name:"LONG",
		multiplier:1,
		default:true,
		values:["", "long", "LONG"],
		decimalPlaces:0
	},
	{
		type:"exchanged",
		name:"USD",
		multiplier:"usd",
		values:["usd"],
		decimalPlaces:3,
		symbol:"$"
	},
	{
		type:"exchanged",
		name:"EUR",
		multiplier:"eur",
		values:["eur"],
		decimalPlaces:3,
		symbol:"€"
	},
];

module.exports = {
	name:"Longcoin",
	ticker:"LNG",
	logoUrl:"/img/logo/long256.png",
	siteTitle:"LONG Explorer",
	siteDescriptionHtml:"<b>BTC Explorer</b> is <a href='https://github.com/janoside/btc-rpc-explorer). If you run your own [Bitcoin Full Node](https://bitcoin.org/en/full-node), **BTC Explorer** can easily run alongside it, communicating via RPC calls. See the project [ReadMe](https://github.com/janoside/btc-rpc-explorer) for a list of features and instructions for running.",
	nodeTitle:"Longcoin Full Node",
	nodeUrl:"https://longnetwork.github.io/",
	demoSiteUrl: "https://longnetwork.github.io/",
	miningPoolsConfigUrls:[
		//"https://raw.githubusercontent.com/btccom/Blockchain-Known-Pools/master/pools.json",
		//"https://raw.githubusercontent.com/blockchain/Blockchain-Known-Pools/master/pools.json"                     
	],
	maxBlockWeight: 4000000,
	targetBlockTimeSeconds: 120,
	currencyUnits:currencyUnits,
	currencyUnitsByName:{"LONG":currencyUnits[0]},
	baseCurrencyUnit:currencyUnits[0],
	defaultCurrencyUnit:currencyUnits[0],
        feeSatoshiPerByteBucketMaxima: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	//feeSatoshiPerByteBucketMaxima: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 5, 9, 17, 33, 66],
        //feeSatoshiPerByteBucketMaxima: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 150],
	genesisBlockHash: "0000003b1c67db2b1fcf81b9926028d72a4327809d74f4a6993802741de53c18",
	genesisCoinbaseTransactionId: "4e86a689a907513c1eee7ac53b54eb1e825cb70b119d05505ba7fba130a3d316",
        
        genesisCoinbaseTransaction: {
		"txid":"4e86a689a907513c1eee7ac53b54eb1e825cb70b119d05505ba7fba130a3d316",
		"hash":"4e86a689a907513c1eee7ac53b54eb1e825cb70b119d05505ba7fba130a3d316",
		"blockhash":"000003b1c67db2b1fcf81b9926028d72a4327809d74f4a6993802741de53c18",
		"version":1,
		"locktime":1558007865,
		"size":228,
		"vsize":228,
		"time":1558007865,
		"blocktime":1558007865,
		"vin":[
			{
                            "coinbase":"04ffff7f1d01040c4c4f4e47206e6574776f726b",
                            "sequence": 494927871
			}
		],
		"vout":[
			{
                            "value":"10000.0",
			    "n":0,
			    "scriptPubKey":{
                                "asm": "04583cb1b994aaaeb0039eff0fc2f9737cc696d8545b03360b7e77ebdca227fa4d2a116c7b99b208862b88f0b55b082dc8fb32fb0c9c7bbaec27f6771014e29381 OP_CHECKSIG",
                                "reqSigs": 1,
                                "type": "pubkey",
                                "addresses": [
                                    "1Long1gkARDXkMQGTqTTDLHy9ZhrGUvRWK"
                                ],
                                "p2sh": "3DYt8qzUV4F1gzUu4q1xP2KK1QrvrQYvtw"
                            }  
			}
		]
	},
	historicalData: [
	],
	exchangeRateData:{
		jsonUrl:"https://trade.crypton.cf/api/v1/public/getlastmarketdata",
		responseBodySelectorFunction:function(responseBody) {
			//console.log("Exchange Rate Response: " + JSON.stringify(responseBody));

			var exchangedCurrencies = ["USD", "RUB", "EUR"];

			if (responseBody.bpi) {
				var exchangeRates = {};

				for (var i = 0; i < exchangedCurrencies.length; i++) {
					if (responseBody.bpi[exchangedCurrencies[i]]) {
						exchangeRates[exchangedCurrencies[i].toLowerCase()] = responseBody.bpi[exchangedCurrencies[i]].rate_float;
					}
				}

				return exchangeRates;
			}
			
			return null;
		}
	},
	blockRewardFunction:function(blockHeight) {
		var eras = [ new Decimal8(10000) ];
		for (var i = 1; i < 34; i++) {
			var previous = eras[i - 1];
			eras.push(new Decimal8(previous).dividedBy(2));
		}

		var index = Math.floor(blockHeight / 500000 );

		return eras[index];
	}
};