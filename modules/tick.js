const request = require('request');

module.exports = {
	run: function (message, term) {
		request( 'https://api.coinmarketcap.com/v1/ticker/', function(error, response, body){
	        let coinmarketcapdata = JSON.parse(body)

	        let marketdata = coinmarketcapdata.find(function(item){
	          if (term){
	            return(item.symbol.toLowerCase() == term.toLowerCase())
	          }
	        })
	        if (marketdata){
	          message.reply('$' + marketdata.price_usd)
	        } else {
	          message.reply('No such coin')
	        }
	    })
	}
}