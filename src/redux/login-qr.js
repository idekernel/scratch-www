const keyMirror = require('keymirror');
const defaults = require('lodash.defaults');

const apiws = require('../lib/apiws');
const regAction = require('../lib/apiws').regAction;
const log = require('../lib/log.js');

const Types = keyMirror({
    SET_LOGIN_QR_ERROR: null,
    SET_LOGIN_QR_START: null,
    SET_LOGIN_QR_END: null
});

module.exports.getInitialState = () => ({
    loginQRError: null,
    loginStart: false,
    loginEnd: false
});


module.exports.loginQRReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }
    switch (action.type) {
    case Types.SET_LOGIN_QR_ERROR:
        return defaults({loginQRError: action.loginQRError}, state);
    case Types.SET_LOGIN_QR_START:
        return defaults({loginStart: action.loginStart,
            loginEnd: action.loginEnd
        }, state);
    case Types.SET_LOGIN_QR_END:
        return defaults({loginQROpen: !state.loginQROpen}, state);
    default:
        return state;
    }
};




module.exports.setLoginQRError = loginQRError => ({
    type: Types.SET_LOGIN_QR_ERROR,
    loginQRError: loginQRError
});

module.exports.setLoginQRStart = () => ({
    type: Types.SET_LOGIN_QR_START,
    loginStart: true,
    loginEnd: false
});

module.exports.setLoginQREnd = () => ({
    type: Types.SET_LOGIN_QR_END,
    loginStart: false,
    loginEnd: true
});


module.exports.regAction = () => (dispatch => {
    regAction(Types.SET_LOGIN_QR_START
        , (err, body) => {
        if (err) dispatch(module.exports.setLoginQRError(err.message));
        dispatch(module.exports.setLoginQRStart());
    });

});
