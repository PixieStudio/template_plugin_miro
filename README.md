# Base Plugin for Miro

### Clone

Clone this repository to your local workspace.

`git clone git@github.com:PixieStudio/template_plugin_miro.git`

Install packages.

`npm i`

Populate `src/.config.js`.

You can rename `app.js` if using PM2.

### ENV Development

Start your application with node.

`node src/app.js`

Start your **ngrok tunnel** :

`ngrok http PORT`

Create new app in your Miro Dev Account and fill :

#### Redirect URLs

```
https://XXXX.ngrok.io/static/web-plugin/auth-success.html
https://XXXX.ngrok.io/oauth
```

#### Web Plugin

```
https://XXXX.ngrok.io/static/web-plugin/index.html
```

#### OAuth scopes

```
auditlogs:read
boards:read
boards:write
identity:read
team:read
```

### Build your plugin

#### Workspace

Plugin must be placed in `/static/web-plugin` folder.

Add your HTML files here.

`index.html` link `./js/index.js` for buttons on Miro toolbars.

`auth-success.html` and `not-authorized` are used with the nodeJS app. Used for people who installs the plugin from a board.

`app.html` your plugin display. You can create one per buttons. (sidebar, modal, library...)



#### Stylesheets

Add your CSS files in this folder:

`/static/web-plugin/css`

Some templates are already available:

`bootstrap.min.css` uses Bootswatch Solar Template. Feel free to replace it by any other template you want.

`sidebar.css` is used for Sidebar styles.

`library.css` is used for Library styles.

~~`modal.css` is used for Modal styles.~~

#### Images

`/static/web-plugin/img`

#### JavaScript

Place your plugin scripts here.

`/static/web-plugin/js`

**Core scripts**:

`variables.js`

Store variables like CLIEND_ID, APP_URL, if you have to create some widgets, and need variables for DRY with metadata.

Used for utils.

`index.js`

Set the plugin button. See below.

`classes.js`

Classes.

`events_TYPE.js`

Load modules or functions on your plugin when launched depend of the type (sidebar, library...), event listener. 



#### i18n

`/static/web-plugin/i18n`

Add .json per language. ie. `en.json`

In your HTML file, you can use `<your_tag data-i18n='key.val'></your_tag>`.


