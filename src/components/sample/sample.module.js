import angular from 'angular';

import SampleComponent from './sample.component';
import AppConstants from '../../app.constants';

const SampleModule = angular.module('Sample', [AppConstants])
    .component('sample', SampleComponent);

export default SampleModule.name;
