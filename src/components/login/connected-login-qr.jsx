const PropTypes = require('prop-types');
const React = require('react');
const connect = require('react-redux').connect;

const LoginQR = require('./login-qr.jsx');
const loginqrActions = require('../../redux/login-qr.js');

require('./login-dropdown.scss');

const ConnectedLoginQR = ({
    error,
    onLogIn,
    regAction,
    loginStart
}) => (
    <LoginQR
        error={error}
        loginStart={loginStart}
        regAction={regAction}
        key="login-dropdown-presentation"
        onLogIn={onLogIn}
    />
);

ConnectedLoginQR.propTypes = {
    error: PropTypes.string,
    onLogIn: PropTypes.func
};

const mapStateToProps = state => ({
    error: state.navigation && state.navigation.loginError,
    loginStart: state.loginqr && state.loginqr.loginStart
});

const mapDispatchToProps = dispatch => ({
    regAction: () => {
        dispatch(loginqrActions.regAction());
    }
});

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConnectedLoginQR);
