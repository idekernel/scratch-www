const React = require('react');
const FormattedMessage = require('react-intl').FormattedMessage;
const render = require('../../lib/render.jsx');

const Page = require('../../components/page/www/page.jsx');

require('./home.scss');

const Home = () => (
    <div className="inner about">
        <h1>XKID 少儿编程</h1>

        <div className="masthead">
            <div>
                <p><FormattedMessage id="about.introOne" /></p>
                <p><FormattedMessage id="about.introTwo" /></p>
                <p><FormattedMessage id="about.introThree" /></p>
            </div>
        </div>
    </div>
);

render(<Page><Home /></Page>, document.getElementById('app'));
