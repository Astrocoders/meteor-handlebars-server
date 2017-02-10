This package helps you to use handlebars templates in a easy way. Good for email
templating. This package is a fork of cmather:handlebars-server.

## Install the package
`> meteor add astrocoders:handlebars-server`

## Usage

Any files with a .handlebars/.hbs extension will be available as functions under
the `Handlebars.templates` namespace.

The templates need to be accessible to the server (i.e. put them inside your
/server directory).

The handlebars files should just be regular HTML. Don't wrap them in Meteor
`<template>` tag.

You must import the `Handlebars` namespace as shown below before using.

Example:

**my-template.handlebars**
```
hello, Dr. {{name}}
```

**my-server-code.js**
```javascript
import { Handlebars } from 'meteor/astrocoders:handlebars-server';
Handlebars.templates["my-template"]({name: "Who"});
// > hello, Dr. Who
```

## Helpers

You can define helpers on the server via `OriginalHandlebars.registerHelper`
method.

## License
MIT
