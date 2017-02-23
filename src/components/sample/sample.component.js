import templateUrl from './sample.html';
import './sample.THEME.scss';

export default {
    bindings: {
        text: '<'
    },
    templateUrl,
    controller: class SampleController {
        constructor(BuildProperties) {
            'ngInject';

            this.buildProperties = JSON.stringify(BuildProperties, null, 4);
        }

        $onInit() {
            this.message = `sample text: "${this.text}"`;
        }
    }
};
