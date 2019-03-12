import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../API';
import '../css/PostDetails.css';

export default class PostDetails extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      post: {},
      comments: [],
      postedBy: {},
    };
  }

  componentDidMount = async () => {
    try {
      // set loading state to true
      const promise1 = this.getPostWithUser();
      const promise2 = this.getComments();
      await Promise.all([promise1, promise2]);
      // set loading state to false
      console.log('all content loaded');
    } catch (error) {
      console.error(error);
    }
  };

  getComments = async () => {
    try {
      const commResponse = await API.getPostComments(this.props.match.params.postId);
      this.setState({ comments: commResponse.data });
    } catch (error) {
      throw error;
    }
  };

  getPostWithUser = async () => {
    try {
      const post = (await API.getPost(this.props.match.params.postId)).data;
      this.setState({ post });
      const postedBy = (await API.getUser(post.userId)).data;
      this.setState({ postedBy });
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { post, postedBy, comments } = this.state;
    return (
      <div className="post-details container">
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <p>Posted by {postedBy.name}</p>

        <div className="comments">
          <h3>Comments</h3>
          <ul className="list">
            {comments.map(comment => (
              <li key={comment.id}>
                <h4>{comment.name}</h4>
                <p>{comment.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
