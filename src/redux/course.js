const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');

const api = require('../lib/api');
const log = require('../lib/log.js');

const Types = keyMirror({
    SET_COURSE_ERROR: null,
    SET_COURSE_STATUS: null,
    SET_COURSE_INFO: null,
    SET_COURSE_ID: null

});

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

module.exports.getInitialState = () => ({
    courseError: null,
    status: module.exports.Status.NOT_FETCHED,
    courseInfo: {},
    id: ''
});


module.exports.courseReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_COURSE_ERROR:
        return defaults({courseError: action.courseError}, state);
    case Types.SET_COURSE_STATUS:
        return defaults({status: action.status}, state);
    case Types.SET_COURSE_INFO:
        return defaults({courseInfo: action.info || {} }, state);
    case Types.SET_COURSE_ID:
        return defaults({id: action.id || '' }, state);
    default:
        return state;
    }
};




module.exports.setCourseError = courseError => ({
    type: Types.SET_COURSE_ERROR,
    courseError
});

module.exports.setStatus = status => ({
    type: Types.SET_COURSE_STATUS,
    status: status
});

module.exports.setCourseInfo = info => ({
    type: 'SET_COURSE_INFO',
    info: info
});
module.exports.setCourseId = id => ({
    type: 'SET_COURSE_ID',
    id
});


module.exports.getCouserInfo = (token) => (dispatch => {
    const opts = {
        host: 'http://localhost:6001', // for test origin ''
        uri: `/api/course/`
    };
    if (token) {
        Object.assign(opts, {authentication: token});
    }
    dispatch(module.exports.setStatus(module.exports.Status.FETCHING));
    api(opts, (err, body, response) => {
        if (err) {
            dispatch(module.exports.setStatus(module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError(err));
            return;
        }
        if (typeof body === 'undefined' || response.statusCode === 404) {
            dispatch(module.exports.setStatus(module.exports.Status.ERROR));
            dispatch(module.exports.setCourseError('No course info'));
            dispatch(module.exports.setCourseInfo(null));
            return;
        }
        dispatch(module.exports.setStatus(module.exports.Status.FETCHED));
        dispatch(module.exports.setCourseInfo(body));

    });
});