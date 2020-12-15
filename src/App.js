import React from 'react';
import { getSavedPosts } from './reddit.js';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Divider, CssBaseline, Drawer, List, ListItem, ListItemText, Toolbar, Typography
} from '@material-ui/core';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));


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
      <div
        style={{
          display: 'flex'
        }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          style={{
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth}}
          >
            <Toolbar>
            <Typography variant="h6" noWrap>
              Header
            </Typography>
            </Toolbar>
        </AppBar>
        <SubredditList subreddits={this.state.subreddits} />
        <main
          style={{
            flexGrow: 1
          }}
          >
          <Toolbar/>
          <PostList posts={this.state.posts} />
        </main>
      </div>
    );
  }
}


class SubredditList extends React.Component {
  render() {
    return (
      <Drawer
        anchor="left"
        variant="permanent"
        style={{
          flexShrink: 0,
          width: drawerWidth
        }}
      >
        <Divider />
        <List>
          {
            this.props.subreddits.map((sub) => (
              <ListItem button key={sub}>
                <ListItemText primary={sub}/>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
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
