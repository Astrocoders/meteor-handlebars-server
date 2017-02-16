import OriginalHandlebars from 'handlebars';

const Handlebars = global.Handlebars || {};
_.extend(Handlebars, {
  templates: {}
});

export {
  OriginalHandlebars,
  Handlebars
};
