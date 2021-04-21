# `ekko-client`

JavaScript client to interact with realtime `ekko-server`

Added develop branch

## Update distribution file

Use the following commands to create new distribution JavaScript files. [Browserfy](http://browserify.org/) is used to bundle dependencies into one file.

- `./lib/ekko-client.js` is used as the source file
- The bundled file is saved to `./dist/ekko-client-v#.#.#.js
- The current npm project version is automatically used when naming the file

### Manually generate distribution file

```bash
npm run build
```

### Automatically generate distribution file when source file changes

```bash
npm run watch
```
