# otis-ai-vue-client

Otis AI: Your Digital SEO Scribe!

This template should help get you started developing with Vue 3 in Vite.

## Vue client parameters

### Build the file for the connection with the backend API

build the file 'vue-client/src/backend.config.js' and make sure it follows the structure below: 

~~~
const backendConfig = {
    development: 'http://127.0.0.1/',
    production: 'http://api.example.com'
};
  
export default backendConfig;
~~~

### Deployment Instructions for Traditional Servers

When deploying to a server that requires a traditional setup, follow these steps:

1. **Build the Vue.js Application**:
   Run the build command to generate the `dist` directory.
   ~~~
   npm run build
   ~~~

2. **Prepare the Directory Structure**:
   Ensure that the `dist` directory, `server.js`, and `package.json` are in the correct locations.

- Your project structure should look like this:
~~~
 /srv/data/web/vhosts/default/
 ├── dist/
 │   ├── index.html
 │   ├── assets/
 │   │   ├── fichier1.js
 │   │   ├── fichier2.css
 │   │   └── ...
 ├── server.js
 └── package.json
~~~

3. **Create or Update `server.js`**:

Ensure that `server.js` is configured to serve the static files from the `dist` directory.
    
~~~
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
~~~

4. **Create or Update package.json:**

Ensure that package.json includes the necessary dependencies and the start script.

~~~
{
    "name": "vue-static-server",
    "version": "1.0.0",
    "description": "Static server for Vue.js application",
    "main": "server.js",
    "scripts": {
        "start": "node server.js"
    },
    "dependencies": {
        "express": "^4.17.1"
    }
}
~~~

5. **Install Dependencies:**

Connect to your server via SSH and navigate to the directory containing server.js and package.json. Run the following command to install dependencies:

~~~
npm install
~~~

6. **Start the server**

Start the server using the appropriate method to ensure it runs in the background. For example:

~~~
nohup npm start &
~~~

Or use pm2 for process management:

~~~
pm2 start server.js
pm2 save
pm2 startup
~~~

By following these steps, you will ensure that your Vue.js application is correctly deployed and served by the Node.js backend.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
