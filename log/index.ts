import * as log from 'https://deno.land/std/log/mod.ts';

// 自定义log
await log.setup({
  handlers: {
    stringFmt: new log.handlers.ConsoleHandler("INFO", {
      formatter: "[{levelName}] {msg}"
    }),
    functionFmt: new log.handlers.ConsoleHandler("DEBUG", {
      formatter: logRecord => {
        let msg = `${logRecord.level} ${logRecord.msg}`;

        logRecord.args.forEach((arg, index) => {
          msg += `, arg${index}: ${arg}`;
        });

        return msg;
      }
    }),
  },
  loggers: {
    default: {
        level: "DEBUG",
        handlers: ["stringFmt", "functionFmt"],
    },
 }
})

let logger = log.getLogger()
logger.info('info hello world');
logger.warning('warning, hello world');
logger.error('error, hello world');
log.debug("Hello, world!", 1, "two", [3, 4, 5]);

