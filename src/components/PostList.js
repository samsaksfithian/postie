import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import base from '../base';
import API from '../API';
import '../css/PostList.css';

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page: 1,
      likes: {},
    };
  }

  componentDidMount = () => {
    API.getAllPosts(this.state.page).then(response =>
      this.setState({ posts: response.data }),
    );
    this.ref = base.syncState('likes', {
      context: this,
      state: 'likes',
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.page !== this.state.page) {
      API.getAllPosts(this.state.page).then(response =>
        this.setState({ posts: response.data }),
      );
    }
  };

  handleUpvotes = postId => {
    this.setState(prevState => ({
      likes: {
        ...prevState.likes,
        [postId]: prevState.likes[postId] ? prevState.likes[postId] + 1 : 1,
      },
    }));
  };

  handleDownvotes = postId => {
    this.setState(prevState => ({
      likes: {
        ...prevState.likes,
        [postId]:
          prevState.likes[postId] && prevState.likes[postId] > 0
            ? prevState.likes[postId] - 1
            : prevState.likes[postId],
      },
    }));
  };

  handleSinglePageChange = next => {
    if (next) {
      if (this.state.page < 10) {
        this.setState(prevState => ({ page: prevState.page + 1 }));
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (this.state.page > 1) {
        this.setState(prevState => ({ page: prevState.page - 1 }));
      }
    }
  };

  render() {
    const { likes } = this.state;
    return (
      <div className="post-list container">
        <ul className="list">
          {this.state.posts.map(post => (
            <li key={post.id}>
              <p className="list-item-title">{post.title}</p>
              <Link to={`/posts/${post.id}`} className="details">
                Details
              </Link>
              <div className="likes">
                <button type="button" onClick={() => this.handleUpvotes(post.id)}>
                  👍
                </button>
                <span>{likes[post.id] ? likes[post.id] : 0}</span>
                <button type="button" onClick={() => this.handleDownvotes(post.id)}>
                  👎
                </button>
              </div>
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => this.handleSinglePageChange(false)}>
          &lt; Prev page
        </button>
        <span>{this.state.page}</span>
        <button type="button" onClick={() => this.handleSinglePageChange(true)}>
          Next page &gt;
        </button>
      </div>
    );
  }
}
