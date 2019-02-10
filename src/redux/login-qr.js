const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');

const apiws = require('../lib/apiws');
const regAction = require('../lib/apiws').regAction;
const log = require('../lib/log.js');

const Types = keyMirror({
    SET_LOGIN_QR_ERROR: null,
    SET_LOGIN_STATUS: null
});

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null
});

module.exports.getInitialState = () => ({
    loginQRError: null,
    status: module.exports.Status.NOT_FETCHED
});


module.exports.loginQRReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_LOGIN_QR_ERROR:
        return defaults({loginQRError: action.loginQRError}, state);
    case Types.SET_LOGIN_STATUS:
        return defaults({status: action.status}, state);
    default:
        return state;
    }
};




module.exports.setLoginQRError = loginQRError => ({
    type: Types.SET_LOGIN_QR_ERROR,
    loginQRError: loginQRError
});

module.exports.setStatus = status => ({
    type: Types.SET_LOGIN_STATUS,
    status: status
});


module.exports.regAction = () => (dispatch => {
    regAction(Types.SET_LOGIN_STATUS
        , (err, body) => {
        if (err) dispatch(module.exports.setLoginQRError(err.message));
        dispatch(module.exports.setStatus(module.exports.Status.FETCHING));
    });

});
