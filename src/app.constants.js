import angular from 'angular';

const AppConstants = angular
    .module('AppConstants', [])
    .constant('BuildProperties', BUILD_PROPERTIES);

export default AppConstants.name;
