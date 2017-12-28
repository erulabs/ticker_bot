//Ticker bots

const Discord = require('discord.js');
const client = new Discord.Client();
const commands = ['subscribe', 'unsubscribe', 'mylist', 'top', 'help', 'quickmafs', 'man=']

function subscribe() {
  message.reply('is now subscribed to tickerbot!')
}


client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content.indexOf('tick') === 0) {
      let term = message.content.split(' ')[1]
      if (commands[term]){

      }
      else {
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
});

client.login(process.env.DISCORD_TOKEN);
//console.log(process.env.DISCORD_TOKEN);

const request = require('request');
