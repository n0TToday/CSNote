import auth from './auth';
import route from './route';
import repo from './repo';
import tag from './tag';

export default [...auth, ...route, ...tag, ...repo];
