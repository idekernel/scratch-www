const React = require('react');
const render = require('../../lib/render.jsx');

const Page = require('../../components/page/www/page.jsx');
require('./about.scss');
const About = () => (
    
    <div className="about">
    </div>
);

render(<Page><About /></Page>, document.getElementById('app'));
