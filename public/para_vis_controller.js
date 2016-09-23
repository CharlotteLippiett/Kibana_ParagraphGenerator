define(function (require) {
  var _ = require('lodash');
  // get the kibana/metric_vis module, and make sure that it requires the "kibana" module if it
  // didn't already
  const module = require('ui/modules').get('kibana/Kibana_ParagraphGenerator', ['kibana']);

  module.controller('KbnParaVisController', function ($scope, Private) {
    const tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));

    const paras = $scope.paras = [];

    function isInvalid(val) {
      return _.isUndefined(val) || _.isNull(val) || _.isNaN(val);
    }

    $scope.processTableGroups = function (tableGroups) {
      tableGroups.tables.forEach(function (table) {
        table.columns.forEach(function (column, i) {
          const fieldFormatter = table.aggConfig(column).fieldFormatter();
          let value = table.rows[0][i];

          value = isInvalid(value) ? '?' : fieldFormatter(value);

          paras.push({
            label: column.title,
            value: value
          });
        });
      });
    };

    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        paras.length = 0;
        $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));
      }
    });
  });
});
