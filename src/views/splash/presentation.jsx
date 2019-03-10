const bindAll = require('lodash.bindall');
const injectIntl = require('react-intl').injectIntl;
const intlShape = require('react-intl').intlShape;
const MediaQuery = require('react-responsive').default;
const PropTypes = require('prop-types');
const React = require('react');

const sessionActions = require('../../redux/session.js');

const ConectedCourse = require('../../components/course/conected-course.jsx');


// Featured Banner Components
const TopBanner = require('./feature/top-banner.jsx');


require('./splash.scss');

// Splash page
class SplashPresentation extends React.Component { // eslint-disable-line react/no-multi-comp
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleMessage',
        ]);
    }
    componentDidMount () {
        if (this.props.shouldShowEmailConfirmation) window.addEventListener('message', this.handleMessage);
    }
    componentWillUnmount () {
        window.removeEventListener('message', this.handleMessage);
    }
    handleMessage (e) {
        if (e.origin !== window.location.origin) return;
        if (e.source !== this.emailConfirmationiFrame.contentWindow) return;
        if (e.data === 'resend-done') {
            this.props.onHideEmailConfirmationModal();
        } else {
            const data = JSON.parse(e.data);
            if (data.action === 'leave-page') {
                window.location.href = data.uri;
            }
        }
    }
    
    render () {

        return (
            <div className="splash">
               
                {
                    this.props.sessionStatus === sessionActions.Status.FETCHED &&
                    Object.keys(this.props.user).length === 0 && // if user is not logged in
                    [
                        <MediaQuery
                            key="frameless-tablet"
                            minWidth={0}
                        >
                            <TopBanner />
                        </MediaQuery>
                    ] 
                }
                {
                    this.props.sessionStatus === sessionActions.Status.FETCHED &&
                    Object.keys(this.props.user).length !== 0 && // if user is logged in
                    [<img src="/svgs/feature/illustration-left.svg" />,
                    <MediaQuery
                        key="frameless-tablet"
                        minWidth={0}
                    >
                        <div
                            className="inner mod-splash"
                            key="inner"
                        >
                            {this.props.user && this.props.user.id && <ConectedCourse/>}
                        </div>
                    </MediaQuery>
                    ]
                }
               
            </div>
        );
    }
}

SplashPresentation.propTypes = {
    activity: PropTypes.arrayOf(PropTypes.object),
    adminPanelOpen: PropTypes.bool,
    emailConfirmationModalOpen: PropTypes.bool.isRequired,
    featuredGlobal: PropTypes.shape({
        community_featured_projects: PropTypes.array,
        community_featured_studios: PropTypes.array,
        curator_top_projects: PropTypes.array,
        scratch_design_studio: PropTypes.array,
        community_most_remixed_projects: PropTypes.array,
        community_most_loved_projects: PropTypes.array
    }),
    inStudiosFollowing: PropTypes.arrayOf(PropTypes.object),
    intl: intlShape,
    isAdmin: PropTypes.bool.isRequired,
    isEducator: PropTypes.bool.isRequired,
    lovedByFollowing: PropTypes.arrayOf(PropTypes.object),
    news: PropTypes.arrayOf(PropTypes.object),
    onCloseAdminPanel: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onHideEmailConfirmationModal: PropTypes.func.isRequired,
    onOpenAdminPanel: PropTypes.func.isRequired,
    onRefreshHomepageCache: PropTypes.func.isRequired,
    onShowEmailConfirmationModal: PropTypes.func.isRequired,
    refreshCacheStatus: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    sessionStatus: PropTypes.string.isRequired,
    sharedByFollowing: PropTypes.arrayOf(PropTypes.object),
    shouldShowEmailConfirmation: PropTypes.bool.isRequired,
    shouldShowWelcome: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

SplashPresentation.defaultProps = {
    activity: [], // recent social actions taken by users someone is following
    featuredGlobal: {}, // global homepage rows, such as "Featured Projects"
    inStudiosFollowing: [], // "Projects in Studios I'm Following"
    lovedByFollowing: [], // "Projects Loved by Scratchers I'm Following"
    news: [], // gets news posts from the scratch Tumblr
    sharedByFollowing: [], // "Projects by Scratchers I'm Following"
};

module.exports = injectIntl(SplashPresentation);
