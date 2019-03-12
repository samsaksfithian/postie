import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../API';
import '../css/PostList.css';

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      page: 1,
    };
  }

  componentDidMount = () => {
    API.getAllPosts(this.state.page).then(response =>
      this.setState({ posts: response.data }),
    );
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.page !== this.state.page) {
      API.getAllPosts(this.state.page).then(response =>
        this.setState({ posts: response.data }),
      );
    }
  };

  handleSinglePageChange = next => {
    if (next) {
      if (this.state.page < 10) {
        this.setState(prevState => ({ page: prevState.page + 1 }));
      }
    } else {
      if (this.state.page > 1) {
        this.setState(prevState => ({ page: prevState.page - 1 }));
      }
    }
  };

  render() {
    return (
      <div className="post-list container">
        <ul className="list">
          {this.state.posts.map(post => (
            <li key={post.id}>
              <p className="list-item-title">{post.title}</p>
              <Link to={`/posts/${post.id}`} className="details">
                Details
              </Link>
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
