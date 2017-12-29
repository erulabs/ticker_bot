const request = require('request');

module.exports = {
	help: 'tick <symbol> - gets the price of a currency!',
	run: function (message, term, prices) {
		request( 'https://api.coinmarketcap.com/v1/ticker/', function(error, response, body){
	        let coinmarketcapdata = JSON.parse(body)

	        let marketdata = coinmarketcapdata.find(function(item){
	        	if (term){
	        		return(item.symbol.toLowerCase() == term.toLowerCase())
	        	}
	        })

	        let pct_change = 0

	        if (marketdata){
						
						if (prices.hasOwnProperty(marketdata.symbol)) {
							pct_change = (marketdata.price_usd-prices[marketdata.symbol])/prices[marketdata.symbol]*100
							prices[marketdata.symbol] = marketdata.price_usd
						} else {
							prices[marketdata.symbol] = {}
							prices[marketdata.symbol] = marketdata.price_usd
						}
						
	        	pct_change = pct_change.toFixed(2)
	        	let sym_resp = `$${marketdata.price_usd} (tick: ${pct_change}%) (1h: ${marketdata.percent_change_1h}%) (24h: ${marketdata.percent_change_24h}%) (7d: ${marketdata.percent_change_7d}%)`
	        	message.reply(sym_resp)
	        } else {
	        	message.reply('No such coin')
	        }
	    })
	}
}
