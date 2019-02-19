const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');

const api = require('../lib/api');
const log = require('../lib/log.js');

const Types = keyMirror({
    SET_COURSE_ERROR: null,
    SET_COURSE_STATUS: null,
    SET_COURSE_INFO: null,
    SET_COURSE_ID: null,
    SET_COURSE_PROJECTS: null

});

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

module.exports.getInitialState = () => ({
    courseError: null,
    status: module.exports.Status.NOT_FETCHED,
    courseInfo: [],
    id: -1,
    projects: []
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
    case Types.SET_COURSE_PROJECTS:
        return defaults({projects: action.projects}, state);
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
module.exports.setProjects = projects => ({
    type: 'SET_COURSE_PROJECTS',
    projects
});

module.exports.setUserCourseId = (courseid, token) => ((dispatch, state) => {
    const user = state().session.session.user;
    if (user && user.id && courseid) {
        dispatch(module.exports.getProjects(courseid, token));
        const formData = {sel_course: parseInt(courseid)};
        const opts = {
            host: '', // for test origin ''
            uri: `/api/user/` + user.id,
            method: 'put',
            json: formData,
            useCsrf: true
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
                dispatch(module.exports.setCourseId(-1));
                return;
            }
            dispatch(module.exports.setStatus(module.exports.Status.FETCHED));
            dispatch(module.exports.setCourseId(courseid));
    
        });
    }
    
});

module.exports.getProjects = (cid, token) => ((dispatch, state) => {
    const opts = {
        host: '', // for test origin ''
        uri: `/api/projects/?cid=${cid}` 
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
            dispatch(module.exports.setProjects([]));
            return;
        }
        dispatch(module.exports.setStatus(module.exports.Status.FETCHED));
        dispatch(module.exports.setProjects(body.rows));

    });
});

module.exports.delProject = (id, token) => ((dispatch, state) => {
    const opts = {
        host: '', // for test origin ''
        uri: `/api/projects/${id}`,
        method: 'delete'
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
            // dispatch(module.exports.setProjects([]));
            return;
        }
        dispatch(module.exports.setStatus(module.exports.Status.FETCHED));
        dispatch(module.exports.getProjects(state().course.id));
    });
});


module.exports.getCouserInfo = (token) => ((dispatch, state) => {
    const opts = {
        host: '', // for test origin ''
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
            dispatch(module.exports.setCourseInfo([]));
            return;
        }
        dispatch(module.exports.setStatus(module.exports.Status.FETCHED));
        dispatch(module.exports.setCourseInfo(body));

    });
});