const keyMirror = require('keymirror');

const api = require('../lib/api');
const log = require('../lib/log');

module.exports.Status = keyMirror({
    FETCHED: null,
    NOT_FETCHED: null,
    FETCHING: null,
    ERROR: null
});

module.exports.getInitialState = () => ({
    activity: {
        status: module.exports.Status.NOT_FETCHED,
        rows: []
    },
    featured: {
        status: module.exports.Status.NOT_FETCHED,
        rows: {}
    },
    shared: {
        status: module.exports.Status.NOT_FETCHED,
        rows: []
    },
    loved: {
        status: module.exports.Status.NOT_FETCHED,
        rows: []
    },
    studios: {
        status: module.exports.Status.NOT_FETCHED,
        rows: []
    }
});

module.exports.splashReducer = (state, action) => {
    if (typeof state === 'undefined') {
        state = module.exports.getInitialState();
    }

    switch (action.type) {
    case 'SET_ROWS':
        state = JSON.parse(JSON.stringify(state));
        state[action.rowType].rows = action.rows;
        return state;
    case 'SET_FETCH_STATUS':
        state = JSON.parse(JSON.stringify(state));
        state[action.rowType].status = action.status;
        return state;
    case 'ERROR':
        log.error(action.error);
        return state;
    default:
        return state;
    }
};

module.exports.setError = error => ({
    type: 'ERROR',
    error: error
});

module.exports.setRows = (type, rows) => ({
    type: 'SET_ROWS',
    rowType: type,
    rows: rows
});

module.exports.setFetchStatus = (type, status) => ({
    type: 'SET_FETCH_STATUS',
    rowType: type,
    status: status
});

module.exports.getActivity = (username, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('activity', module.exports.Status.FETCHING));
    api({
        uri: `/users/${username}/following/users/activity?limit=5`,
        authentication: token
    }, (err, body, res) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('activity', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined' || res.statusCode !== 200) {
            dispatch(module.exports.setFetchStatus('activity', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No session content'));
            return;
        }
        dispatch(module.exports.setFetchStatus('activity', module.exports.Status.FETCHED));
        dispatch(module.exports.setRows('activity', body));
    });
});

/*
 * Get global homepage rows
 */
module.exports.getFeaturedGlobal = () => (dispatch => {
    dispatch(module.exports.setFetchStatus('featured', module.exports.Status.FETCHING));
    api({
        uri: '/proxy/featured'
    }, (err, body, res) => {
        // for test
        err = null;
        body = {
            "community_newest_projects": [{
                "thumbnail_url": "//uploads.scratch.mit.edu/projects/thumbnails/283547561.png",
                "title": "s u r r e a l  m e m e s  v o l .4",
                "creator": "catswithfadoras1034",
                "type": "project",
                "id": 283547561,
                "love_count": 0
            }],
            "community_most_remixed_projects": [{
                "title": "Questions I dare you to answer",
                "type": "project",
                "remixers_count": 202,
                "love_count": 160,
                "thumbnail_url": "//uploads.scratch.mit.edu/projects/thumbnails/282371488.png",
                "creator": "Deathstriding",
                "id": 282371488
            }],
            "scratch_design_studio": [{
                "gallery_id": 5801323,
                "creator": "bluefurr",
                "remixers_count": 1,
                "gallery_title": "Year 3000",
                "love_count": 2,
                "thumbnail_url": "//uploads.scratch.mit.edu/projects/thumbnails/277789958.png",
                "title": "Scratch design studio: Year 3000",
                "type": "project",
                "id": 277789958
            }],
            "community_featured_studios": [{
                "thumbnail_url": "//uploads.scratch.mit.edu/galleries/thumbnails/5803119.png",
                "type": "gallery",
                "id": 5803119,
                "title": "-Learn More About The Oceans-"
            }],
            "community_featured_projects": [{
                "thumbnail_url": "//uploads.scratch.mit.edu/projects/thumbnails/281206514.png",
                "title": "Element Personality Quiz (update in progress)",
                "creator": "swimming_dolphin",
                "type": "project",
                "id": 281206514,
                "love_count": 24
            }]
        };
        if (err) {
            dispatch(module.exports.setFetchStatus('featured', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined' || res.statusCode !== 200) {
            dispatch(module.exports.setFetchStatus('featured', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No session content'));
            return;
        }
        dispatch(module.exports.setFetchStatus('featured', module.exports.Status.FETCHED));
        dispatch(module.exports.setRows('featured', body));
    });
});

/*
 * Get list of projects shared by users the given user is following.
 * @param  {string} username username of the Scratcher for whom to get projects
 * @param  {string} token    authentication
 */
module.exports.getSharedByFollowing = (username, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('shared', module.exports.Status.FETCHING));
    api({
        uri: `/users/${username}/following/users/projects`,
        authentication: token
    }, (err, body, res) => {

        if (err) {
            dispatch(module.exports.setFetchStatus('shared', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined' || res.statusCode !== 200) {
            dispatch(module.exports.setFetchStatus('shared', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No session content'));
            return;
        }
        dispatch(module.exports.setFetchStatus('shared', module.exports.Status.FETCHED));
        dispatch(module.exports.setRows('shared', body));
    });
});

/*
 * Get list of projects in studios that the given user is following.
 * @param  {string} username username of the Scratcher for whom to get projects
 * @param  {string} token    authentication
 */
module.exports.getInStudiosFollowing = (username, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('studios', module.exports.Status.FETCHING));
    api({
        uri: `/users/${username}/following/studios/projects`,
        authentication: token
    }, (err, body, res) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('studios', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined' || res.statusCode !== 200) {
            dispatch(module.exports.setFetchStatus('studios', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No session content'));
            return;
        }
        dispatch(module.exports.setFetchStatus('studios', module.exports.Status.FETCHED));
        dispatch(module.exports.setRows('studios', body));
    });
});

/*
 * Get list of projects loved by users the given user is following.
 * @param  {string} username username of the Scratcher for whom to get projects
 * @param  {string} token    authentication
 */
module.exports.getLovedByFollowing = (username, token) => (dispatch => {
    dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHING));
    api({
        uri: `/users/${username}/following/users/loves`,
        authentication: token
    }, (err, body, res) => {
        if (err) {
            dispatch(module.exports.setFetchStatus('loved', module.exports.Status.ERROR));
            dispatch(module.exports.setError(err));
            return;
        }
        if (typeof body === 'undefined' || res.statusCode !== 200) {
            dispatch(module.exports.setFetchStatus('loved', module.exports.Status.ERROR));
            dispatch(module.exports.setError('No session content'));
            return;
        }
        dispatch(module.exports.setFetchStatus('loved', module.exports.Status.FETCHED));
        dispatch(module.exports.setRows('loved', body));
    });
});
