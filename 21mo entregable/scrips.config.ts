import { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";
import { config as env } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts';

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run server.tsx",
      desc: "run my server.tsx file",
      env: env()
    },
  },
  allow: [
    'net',
    'env'
  ],
  tsconfig: './tsconfig.json'
};

export default config;