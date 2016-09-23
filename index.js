'use strict';

module.exports = function (kibana) {

  return new kibana.Plugin({

    uiExports: {
      visTypes: ['plugins/Kibana_ParagraphGenerator/para_vis']
    }

  });
};
