const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');

const api = require('../lib/api');
const messageCountActions = require('./message-count.js');
const permissionsActions = require('./permissions.js');

const Types = keyMirror({
    SET_SESSION: null,
    SET_SESSION_ERROR: null,
    SET_STATUS: null
});

const banWhitelistPaths = [
    '/accounts/banned-response/',
    '/community_guidelines/',
    '/community_guidelines'
];

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

module.exports.getInitialState = () => ({
    status: module.exports.Status.NOT_FETCHED,
    session: {}
});

module.exports.sessionReducer = (state, action) => {
    // Reducer for handling changes to session state
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_SESSION:
        return defaults({session: action.session}, state);
    case Types.SET_STATUS:
        return defaults({status: action.status}, state);
    case Types.SET_SESSION_ERROR:
        // TODO: do something with action.error
        return state;
    default:
        return state;
    }
};

module.exports.setSessionError = error => ({
    type: Types.SET_SESSION_ERROR,
    error: error
});

module.exports.setSession = session => ({
    type: Types.SET_SESSION,
    session: session
});

module.exports.setStatus = status => ({
    type: Types.SET_STATUS,
    status: status
});

module.exports.refreshSession = () => (dispatch => {
    dispatch(module.exports.setStatus(module.exports.Status.FETCHING));
    api({
        host: '', // for test orgin ''
        uri: '/api/session/'
    }, (err, body) => {
        // for test
        err = null;
        body = {
            "user": {
              "id": 2,
              "banned":  false,
              "username": 'godfei',
              "token": "5fdd7c0f07d043c5ae16c372a2025e99:BZ5E--KsMr8Wgm3Ir7wr7hbtt2o",
              "thumbnailUrl": "//cdn2.scratch.mit.edu/get_image/user/default_32x32.png",
              "dateJoined": "2019-01-26T15:52:38",
              "email": "89553983@qq.com"
              
            },
            "permissions": {
              "admin": true,
              "scratcher": false,
              "new_scratcher": true,
              "social": true,
              "educator": false,
              "educator_invitee": false,
              "student": false
            },
            "flags": {
              "must_reset_password": false,
              "must_complete_registration": false,
              "has_outstanding_email_confirmation": false,
              "show_welcome": true,
              "confirm_email_banner": true,
              "unsupported_browser_banner": true
            }
          };
        if (err) return dispatch(module.exports.setSessionError(err));
        if (typeof body === 'undefined') return dispatch(module.exports.setSessionError('No session content'));
        if (
            body.user &&
            body.user.banned &&
            banWhitelistPaths.indexOf(window.location.pathname) === -1
        ) {
            window.location = '/accounts/banned-response/';
            return;
        } else if (
            body.flags &&
            body.flags.must_complete_registration &&
            window.location.pathname !== '/classes/complete_registration'
        ) {
            window.location = '/classes/complete_registration';
            return;
        } else if (
            body.flags &&
            body.flags.must_reset_password &&
            !body.flags.must_complete_registration &&
            window.location.pathname !== '/classes/student_password_reset/'
        ) {
            window.location = '/classes/student_password_reset/';
            return;
        }
        dispatch(module.exports.setSession(body));
        dispatch(module.exports.setStatus(module.exports.Status.FETCHED));

        // get the permissions from the updated session
        dispatch(permissionsActions.storePermissions(body.permissions));
        if (typeof body.user !== 'undefined') {
            dispatch(messageCountActions.getCount(body.user.username));
        }
        return;
    });
});
