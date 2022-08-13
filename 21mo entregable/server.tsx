import ReactDOM from "https://deno.land/x/react_deno@17.0.2/dom_server.ts";
import React from "https://deno.land/x/react_deno@17.0.2/react.ts";
import { createApp } from "https://deno.land/x/servest@v1.3.4/mod.ts";

const app = createApp();
const colors: string[] = [];

const body = () =>
  ReactDOM.renderToString(
    <html>
      <head>
        <meta charSet='utf-8' />
        <title>Colors</title>
      </head>
      <body style={{ background: '#000000', color: '#FFF' }}>
        <form method='POST'>
          <label htmlFor='color'>Pick a color</label>
          <br />
          <input type='text' id='color' name='color' />
          <br />
          <input type='submit' value='Send' />
        </form>
        {!!colors.length && (
          <ul>
            {colors.map((color, i) => (
              <li key={i} style={{ color }}>
                {color}
              </li>
            ))}
          </ul>
        )}
      </body>
    </html>
  );

app.get('/', (req) =>
  req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'text/html; charset=UTF-8',
    }),
    body: body(),
  })
);

app.post('/', async (req) => {
  const color = (await req.formData()).value('color');
  if (color) {
    colors.push(color);
  }
  req.respond({
    status: 200,
    headers: new Headers({
      'content-type': 'text/html; charset=UTF-8',
    }),
    body: body(),
  });
});

app.listen({
  port: +Deno.env.get('PORT')! || 8080,
});
