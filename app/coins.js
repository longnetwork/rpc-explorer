var btc = require("./coins/btc.js");
var bch = require("./coins/bch.js");
var ltc = require("./coins/ltc.js");
var lng = require("./coins/lng.js");

module.exports = {
	"BTC": btc,
	"LTC": ltc,
	"BCH": bch,
        "LONG": lng,

	"coins":["BTC", "LTC", "BCH", "LONG"]
};
