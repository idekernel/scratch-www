const bindAll = require('lodash.bindall');
const FormattedMessage = require('react-intl').FormattedMessage;
const PropTypes = require('prop-types');
const React = require('react');

const Form = require('../forms/form.jsx');
const Input = require('../forms/input.jsx');
const Button = require('../forms/button.jsx');
const Spinner = require('../spinner/spinner.jsx');

const QRCode = require('qrcode')
const uuid = require('../../lib/apiws').uuid;
const loginStatuses = require('../../redux/login-qr').Status;
require('./login.scss');

class LoginQR extends React.Component {
    constructor (props) {
        super(props);
    }
    componentDidMount() {

        this.props.regAction();
        let canvas = this.refs.canvas;
        let callbackurl = 'http://localhost:6001/api/loginqr/' + uuid
            + '/SET_LOGIN_STATUS';

        if (canvas) {
            QRCode.toCanvas(canvas, callbackurl, function (error) {
                if (error) console.error(error)
                console.log('success!');
              })
        }
        
    }
    render () {
        let error;
        if (this.props.error) {
            error = <div className="error">{this.props.error}</div>;
        }
        return (
            <div className="login">
                <Form>
                    <label
                        htmlFor="qr"
                        key="qrLabel"
                    >
                        扫码登录
                    </label>
                    {this.props.status === loginStatuses.NOT_FETCHED &&
                        <canvas
                            ref="canvas"
                            name="qr"
                        />
                    }
                    {this.props.status === loginStatuses.FETCHING &&
                        <Button
                            className="submit-button white"
                            disabled="disabled"
                            key="submitButton"
                            type="submit"
                        >
                            <Spinner
                                className="spinner"
                                color="blue"
                            />
                        </Button>
                    }
                    
                    {error}
                </Form>
            </div>
        );
    }
}

LoginQR.propTypes = {
    error: PropTypes.string,
    onLogIn: PropTypes.func
};

module.exports = LoginQR;