const botkit = require('botkit');
const secrets = require('./.slack/.secrets.json');
const env = {
  port: 8080,
  json_file_store_path: './.slack/.json_file_store/'
};


const controller = botkit.slackbot({
  debug: true,
  json_file_store: env.json_file_store_path
}).configureSlackApp({
  clientId: secrets.clientId,
  clientSecret: secrets.clientSecret,
  redirectUri: secrets.redirectUri,
  scopes: ['commands']
});

controller.setupWebserver(env.port, (err, webserver) => {
  controller.createOauthEndpoints(controller.webserver, (err, req, res) => {
      if (err) {
        res.status(500).send('Error: ' + JSON.stringify(err));
      } else {
        res.send('Success');
      }
    })
    .createWebhookEndpoints(controller.webserver);
});

controller.on('slash_command', (bot, message) => {

  console.log("hogehogehogehoge")

  bot.replyPublic(message, `⏰ 「${message.text}」やるぞー！`);
});
