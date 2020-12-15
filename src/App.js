import React from 'react';
import { getSavedPosts } from './reddit.js';

import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      subreddits: []
    }
  }

  componentDidMount() {
    getSavedPosts().then((posts) => { this.updatePosts(posts) });
  }

  updatePosts(posts) {
    // Make a set first to prevent duplicates, then make into an array and sort
    const subs = Array.from(
      new Set(posts.map((p) => p.subreddit.display_name))
    ).sort();

    this.setState({
      posts: posts,
      subreddits: subs
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Reddit Saved Sort</h1>
        </header>

        <SubredditList subreddits={this.state.subreddits} />
        <PostList posts={this.state.posts} />
      </div>
    );
  }
}


class SubredditList extends React.Component {
  render() {
    return (
      <ul>
        {
          this.props.subreddits.map((sub) => (
            <li>{sub}</li>
          ))
        }
      </ul>
    )
  }
}


class PostList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.posts.map((post) => (
            <Post post={post} />
          ))
        }
        <br/>
      </div>
    );
  }
}


class Post extends React.Component {
  render() {
    if ('preview' in this.props.post)
      return (
        <div>
          <a href={"https://reddit.com" + this.props.post.permalink}>
            <h3>{this.props.post.title}</h3>
            <img src={this.props.post.preview.images[0].source.url}/>
          </a>
        </div>
      )
    else
      return (
        <div>
          {this.props.post.permalink}
        </div>
      )
  }
}


export default App;
