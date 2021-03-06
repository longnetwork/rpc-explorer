var fs = require('fs');
var crypto = require('crypto');
var url = require('url');

var coins = require("./coins.js");
var credentials = require("./credentials.js");

var currentCoin = process.env.BTCEXP_COIN || "LONG";

var rpcCred = credentials.rpc;

if (rpcCred.cookie && !rpcCred.username && !rpcCred.password && fs.existsSync(rpcCred.cookie)) {
	console.log(`Loading RPC cookie file: ${rpcCred.cookie}`);

	[ rpcCred.username, rpcCred.password ] = fs.readFileSync(rpcCred.cookie).toString().split(':', 2);

	if (!rpcCred.password) {
		throw new Error(`Cookie file ${rpcCred.cookie} in unexpected format`);
	}
}

var cookieSecret = process.env.BTCEXP_COOKIE_SECRET
 || (rpcCred.password && crypto.createHmac('sha256', JSON.stringify(rpcCred))
                               .update('btc-rpc-explorer-cookie-secret').digest('hex'))
 || "0x000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f";


var electrumXServerUriStrings = (process.env.BTCEXP_ELECTRUMX_SERVERS || "").split(',').filter(Boolean);
var electrumXServers = [];
for (var i = 0; i < electrumXServerUriStrings.length; i++) {
	var uri = url.parse(electrumXServerUriStrings[i]);
        
        if (uri.protocol) electrumXServers.push({protocol:uri.protocol.substring(0, uri.protocol.length - 1), host:uri.hostname, port:parseInt(uri.port)});
        else { global.electrumStandalone=true; electrumXServers.push({protocol:"standalone", host:"standalone", port:""}); }
}

["BTCEXP_DEMO", "BTCEXP_PRIVACY_MODE", "BTCEXP_NO_INMEMORY_RPC_CACHE"].forEach(function(item) {
	if (process.env[item] === undefined) {
		process.env[item] = "false";
	}
});

["BTCEXP_NO_RATES", "BTCEXP_UI_SHOW_TOOLS_SUBHEADER"].forEach(function(item) {
	if (process.env[item] === undefined) {
		process.env[item] = "true";
	}
});

module.exports = {
	coin: currentCoin,

	cookieSecret: cookieSecret,

	privacyMode: (process.env.BTCEXP_PRIVACY_MODE.toLowerCase() == "true"),
	demoSite: (process.env.BTCEXP_DEMO.toLowerCase() == "true"),
	queryExchangeRates: (process.env.BTCEXP_NO_RATES.toLowerCase() != "true"),
	noInmemoryRpcCache: (process.env.BTCEXP_NO_INMEMORY_RPC_CACHE.toLowerCase() == "true"),

	rpcConcurrency: (process.env.BTCEXP_RPC_CONCURRENCY || 10),

	rpcBlacklist:
	  process.env.BTCEXP_RPC_ALLOWALL  ? []
	: process.env.BTCEXP_RPC_BLACKLIST ? process.env.BTCEXP_RPC_BLACKLIST.split(',').filter(Boolean)
	: [
		"addnode",
		"backupwallet",
		"bumpfee",
		"clearbanned",
		"createmultisig",
        "getaddednodeinfo",
		"disconnectnode",
		"dumpprivkey",
		"dumpwallet",
		"encryptwallet",
		"generate",
        "setgenerate",
		"generatetoaddress",
		"getaccountaddrss",
		"getaddressesbyaccount",
		"getbalance",
		"getnewaddress",
		"getrawchangeaddress",
		"getreceivedbyaccount",
		"getreceivedbyaddress",
		"gettransaction",
		"getunconfirmedbalance",
		"getwalletinfo",
		"importaddress",
		"importmulti",
		"importprivkey",
		"importprunedfunds",
		"importpubkey",
		"importwallet",
		"keypoolrefill",
		"listaccounts",
		"listaddressgroupings",
		"listlockunspent",
		"listreceivedbyaccount",
		"listreceivedbyaddress",
		"listsinceblock",
		"listtransactions",
		"listunspent",
		"listwallets",
		"lockunspent",
		"logging",
		"move",
		"preciousblock",
		"pruneblockchain",
		"removeprunedfunds",
		"rescanblockchain",
		"savemempool",
		"sendfrom",
		"sendmany",
		"sendtoaddress",
		"sendrawtransaction",
        "fundrawtransaction",
		"setaccount",
		"setban",
		"setnetworkactive",
		"signmessage",
		"signmessagewithprivatekey",
		"signrawtransaction",
		"stop",
		"submitblock",
        "prioritisetransaction",
		"verifychain",
		"walletlock",
		"walletpassphrase",
		"walletpassphrasechange",
        "abandontransaction",
        "addmultisigaddress",
        "dumppubkey",
        "getaccount",
        "getaccountaddress",
        "gethexdata",
        "getinfo",
        "sendhexdata",
        "settxfee",
        "storeaddress",
        // hidden
        "invalidateblock",
        "reconsiderblock",
        "setmocktime",
        "resendwallettransactions"
	],

	electrumXServers:electrumXServers,

	redisUrl:process.env.BTCEXP_REDIS_URL,

	site: {
		blockTxPageSize:20,
		addressTxPageSize:20,
		txMaxInput:15,
		browseBlocksPageSize:20,
		addressPage:{
			txOutputMaxDefaultDisplay:10
		},
		header:{
			showToolsSubheader:(process.env.BTCEXP_UI_SHOW_TOOLS_SUBHEADER == "true"),
			dropdowns:[
				{
					title:"Networks",
					links:[
						//{name: "Bitcoin", url:"https://btc.horizontalsystems.xyz", imgUrl:"/img/logo/btc.svg"},
						//{name: "Bitcoin (Testnet)", url:"http://btc-testnet.horizontalsystems.xyz", imgUrl:"/img/logo/btc.svg"},
						//{name: "Bitcoin Cash", url:"https://bch.horizontalsystems.xyz", imgUrl:"/img/logo/bch.svg"},
						//{name: "Bitcoin Cash (Testnet)", url:"http://bch-testnet.horizontalsystems.xyz", imgUrl:"/img/logo/bch.svg"},
						//{name: "Ethereum", url:"https://eth.horizontalsystems.xyz", imgUrl:"/img/logo/eth.svg"},
                                                {name: "Long Wallet", url:"https://longnetwork.github.io/", imgUrl:"/img/logo/long256.png"},
                                                {name: "Long Exchange", url:"https://altmarkets.io/", imgUrl:"/img/logo/altmarkets.jpg"},
                                                {name: "Mining Pool", url:"https://longnomp.crypton.cf", imgUrl:"/img/logo/long256.png"},
                                                //{name: "Mining Pool 2", url:"https://mnshare.info/", imgUrl:"https://mnshare.info/img/mnshare-300-300-pr.png"},
                                                {name: "Long Community EN", url:"https://bitcointalk.org/index.php?topic=5235729", imgUrl:"/img/logo/bitcointalk.jpg"},                                                  
                                                {name: "Long Community RU", url:"https://forum.bits.media/index.php?/topic/163664-long-network-%D0%B4%D0%B5%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%B0%D1%8F-%D1%81%D0%BE%D1%86-%D1%81%D0%B5%D1%82%D1%8C/", imgUrl:"/img/logo/bitsmedia.jpg"}
					]
				}
			]
		}
	},

	credentials: credentials,

	siteTools:[
		{name:"Node Status", url:"/node-status", desc:"Summary of this node: version, network, uptime, etc.", fontawesome:"fas fa-broadcast-tower"},
		{name:"Peers", url:"/peers", desc:"Detailed info about the peers connected to this node.", fontawesome:"fas fa-sitemap"},

		{name:"Browse Blocks", url:"/blocks", desc:"Browse all blocks in the blockchain.", fontawesome:"fas fa-cubes"},
		//{name:"Transaction Stats", url:"/tx-stats", desc:"See graphs of total transaction volume and transaction rates.", fontawesome:"fas fa-chart-bar"},

		//{name:"Mempool Summary", url:"/mempool-summary", desc:"Detailed summary of the current mempool for this node.", fontawesome:"fas fa-clipboard-list"},
		{name:"Unconfirmed Transactions", url:"/unconfirmed-tx", desc:"Browse unconfirmed/pending transactions.", fontawesome:"fas fa-unlock-alt"},

		//{name:"RPC Browser", url:"/rpc-browser", desc:"Browse the RPC functionality of this node. See docs and execute commands.", fontawesome:"fas fa-book"},
		//{name:"RPC Terminal", url:"/rpc-terminal", desc:"Directly execute RPCs against this node.", fontawesome:"fas fa-terminal"},

		// {name:(coins[currentCoin].name + " Fun"), url:"/fun", desc:"See fun/interesting historical blockchain data.", fontawesome:"fas fa-certificate"}
	],

	donations:{
		/*addresses:{
			coins:["BTC"],
			sites:{"BTC":"https://btc.chaintools.io"},

			"BTC":{address:"1NbmV7xzXWvnPkYDfx4Vh7hk3LW5237RKR"}
		},
		btcpayserver:{
			host:"https://btcpay.chaintools.io",
			storeId:"DUUExHMvKNAFukrJZHCShMhwZvfPq87QnkUhvE6h5kh2",
			notifyEmail:"chaintools.io@gmail.com"
		}*/
	}
};
