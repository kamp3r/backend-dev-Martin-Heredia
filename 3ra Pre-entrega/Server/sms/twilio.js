const {configuration} = require('../config/config');
const {Twilio} = require('twilio');

const client = new Twilio(configuration.twilioSID, configuration.twilioTKN);

