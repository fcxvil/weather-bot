const axios = require("axios");
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Runned Succesfully');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const TelegramBot = require('node-telegram-bot-api');

// Telegram Bot token
const token = "6770429572:AAFv5mVMuZgJn0UxfC_Qqa0zOYqMPPvALcg";
// Weather API token
const weatherApiKey = 'ea05f0b6617d998492f421c4335d3bba';

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
  console.log(msg);
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Salom ObXavoni Bilish Uchun\n/obhavo shahar nomi \n masalan /obhavo tashkent');
});

// Handle /weather command
bot.onText(/\/obhavo (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const city = match[1];
  try {
    // Fetch weather data
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`);
    const weatherData = response.data;

    // Format weather response
    const weatherText = `${city}dagi Ob Havo: ${weatherData.weather[0].description}, Temperatura: ${weatherData.main.temp}°C`;

    // Send weather data to user
    bot.sendMessage(chatId, weatherText);
  } catch (error) {
    console.error('Error fetching weather:', error);
    bot.sendMessage(chatId, 'Sorry, an error occurred while fetching weather data.');
  }
});