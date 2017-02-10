/* jshint esnext: true */
import {CachingCompiler} from 'meteor/caching-compiler';
import {EJSON} from 'meteor/ejson';

Plugin.registerCompiler({
  extensions: ['handlebars', 'hbs'],
  archMatching: 'os',
}, () => new HandlebarsServer());

class HandlebarsServer extends CachingCompiler {
  constructor(){
    super({
      compilerName: 'handlebars',
      defaultCacheSize: 1024*1024*10,
    });
  }

  compileOneFile(file){
    const output = this.compileHandlebar(file);

    file.addJavaScript({
      data: output,
      path: `${file.getPathInPackage()}.js`,
    });
  }

  getCacheKey(file){
    return [ file.getSourceHash() ];
  }

  compileHandlebar(file){
    const templateName = EJSON.stringify(file.getBasename().replace(/(\.hbs)|(\.handlebars)/, ''));

    const content = EJSON.stringify(file.getContentsAsString());

    const output =`
      var handlebarsServer = require('meteor/astrocoders:handlebars-server');
      var template = handlebarsServer.OriginalHandlebars.compile(${content});
      handlebarsServer.Handlebars.templates[${templateName}] = function(data, partials){
        partials = partials || {};
        return template(data || {}, {
          helpers: handlebarsServer.OriginalHandlebars.helpers,
          partials: partials,
          name: ${templateName}
        });
      }`;

    return output;
  }
}
