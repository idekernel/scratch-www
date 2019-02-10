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

require('./login.scss');

class LoginQR extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleSubmit'
        ]);
        this.state = {
            waiting: false
        };
    }
    componentDidMount() {

        this.props.regAction();
        let canvas = this.refs.canvas;
        let callbackurl = 'http://localhost:6001/api/loginqr/' + uuid;

        QRCode.toCanvas(canvas, callbackurl, function (error) {
          if (error) console.error(error)
          console.log('success!');
        })
    }
    handleSubmit (formData) {
        this.setState({waiting: true});
        this.props.onLogIn(formData, () => {
            this.setState({waiting: false});
        });
    }
    render () {
        let error;
        if (this.props.error) {
            error = <div className="error">{this.props.error}</div>;
        }
        return (
            <div className="login">
                <Form onSubmit={this.handleSubmit}>
                    <label
                        htmlFor="qr"
                        key="qrLabel"
                    >
                        <FormattedMessage id="general.qr" />
                    </label>
                    {this.props.loginStart === false &&
                        <canvas
                            ref="canvas"
                            name="qr"
                        />
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