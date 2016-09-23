define(function (require) {
  // we need to load the css ourselves
  require('plugins/para_vis/para_vis.less');

  // we also need to load the controller and used by the template
  require('plugins/para_vis/para_vis_controller.js');

  // register the provider with the visTypes registry
  require('ui/registry/vis_types').register(ParaVisProvider);

  function ParaVisProvider(Private) {
    const TemplateVisType = Private(require('ui/template_vis_type/TemplateVisType'));
    const Schemas = Private(require('ui/Vis/Schemas'));

    // return the visType object, which kibana will use to display and configure new
    // Vis object of this type.
    return new TemplateVisType({
      name: 'para',
      title: 'Paragraph Generator',
      description: 'Create custom paragraphs/blocks of text with the addition of automatica paramters.',
      icon: 'fa-calculator',
      template: require('plugins/para_vis/para_vis.html'),
      params: {
        defaults: {
          handleNoResults: true,
          fontSize: 60
        },
        editor: require('plugins/para_vis/para_vis_params.html')
      },
      schemas: new Schemas([
        {
          group: 'paras',
          name: 'para',
          title: 'Paragraph Generator',
          min: 1,
          defaults: [
            { type: 'count', schema: 'para' }
          ]
        }
      ])
    });
  }

  // export the provider so that the visType can be required with Private()
  return ParaVisProvider;
});
