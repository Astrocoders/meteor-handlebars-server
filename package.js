Package.describe({
  name: 'astrocoders:handlebars-server',
  version: '1.0.3',
  summary: 'Allows handlebars templates to be defined on the server in .handlebars files',
  git: 'https://github.com/Astrocoders/meteor-handlebars-server',
  documentation: 'README.md',
});

Npm.depends({
  'handlebars': '4.0.4',
});

Package.registerBuildPlugin({
  name: 'compileServerHandlebarsTemplates',

  use: [
    'caching-compiler@1.0.0',
    'ecmascript',
    'modules',
    'ejson@1.0.7',
  ],

  sources: [
    'plugin/compile-handlebars.js',
  ],

  npmDependencies: {
    'handlebars': '4.0.4',
  },
});

Package.onUse(function(api){
  api.versionsFrom('1.3.1');

  api.use([
    'ecmascript',
    'modules',
    'underscore',
    'isobuild:compiler-plugin@1.0.0',
  ], 'server');

  api.mainModule('handlebars-server.js', 'server');

  api.export([
    'Handlebars',
    'OriginalHandlebars',
  ], 'server');
});

Package.onTest(function (api) {
  api.use([
    'ecmascript',
    'modules',
    'tinytest',
    'astrocoders:handlebars-server',
    'test-helpers',
  ], 'server');

  api.mainModule('handlebars-server-tests.js', 'server');
  api.addFiles([
    'handlebars-server-tests.handlebars',
    'handlebars-server-tests-2.handlebars',
  ], 'server');
});
