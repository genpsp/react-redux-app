const tweetActions = {
  initTweet(tweets) {
    return {
      type: 'INIT_TWEET',
      payload: tweets
    }
  },
  addTweet(tweet) {
    return {
      type: 'ADD_TWEET',
      payload: tweet
    }
  },
}

export default tweetActions
