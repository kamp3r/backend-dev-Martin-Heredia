const { createLogger, format, addColors, transports } = require('winston');
const { combine, colorize, label, timestamp, printf } = format;

const myConsoleFormat = combine(
  colorize({ all: true }),
  label({ label: '[LOGGER]' }),
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  printf(
    (info) =>
      `${info.label} - ${info.timestamp} -- [${info.level}] -- ${info.message}`
  )
);

const myLogFile = combine(
  label({ label: '[LOGGER]' }),
  timestamp({ format: 'DD-MM-YY HH:mm:ss' }),
  printf(
    (info) =>
      `${info.label} - ${info.timestamp} - [${info.level}] - ${info.message}`
  )
);

addColors({
  info: 'bold green',
  warn: 'bold yellow',
  error: 'bold red',
});

const customLVL = {
    error: 0,
    warn: 1,
    info: 2,
}

const infoAndWarnFilter = format((info) => {
    return info.level === "info" || info.level === "warn" ? info : false;
  });// con esta función hago que no me escriba errors en la parte de warns

const logger = createLogger({
  level: customLVL,
  transports: [
    new transports.Console({ format: combine(myConsoleFormat), level: 'info' }),
    new transports.File({
      format: combine(infoAndWarnFilter(), myLogFile),
      level: 'warn',
      filename: './logs/warn.log',
    }),
    new transports.File({
      format: combine(myLogFile),
      level: 'error',
      filename: './logs/error.log'
    }),
  ],
});


module.exports = logger;