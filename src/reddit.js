const snoowrap = require('snoowrap');

const CLIENT_ID = 'qhMT2QE6zS2e_g'
const CLIENT_SECRET = 'GMz0CZ2YMDlfqnyhtj921EZ8xezxNQ'
const REDDIT_USER = '_shellbot_'
const REDDIT_PASS = '59mQSrxeZMyG'

export async function getSavedPosts() {
	const r = new snoowrap({
		userAgent: 'reddit-saved-sort',
		clientId: CLIENT_ID,
		clientSecret: CLIENT_SECRET,
		username: REDDIT_USER,
		password: REDDIT_PASS
	});

	return await r.getMe().getSavedContent().fetchAll();
}