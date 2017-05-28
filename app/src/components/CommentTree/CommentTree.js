import React from 'react';
import { connect } from 'react-redux';

import { getComments } from 'modules/comments';

import styles from './CommentTree.css';

const Comment = ({ id, content }) => (
  <div className={styles.comment}>
    <div className={styles.commentContent}>{content}</div>
    <ChildComments commentId={id} />
  </div>
);

const CommentTree = ({ comments }) => (
  <div>
    {comments.map(comment => <Comment key={comment.id} {...comment} />)}
  </div>
);

const mapStateToProps = (state, props) => ({
  comments: getComments(state, props)
});

const ChildComments = connect(mapStateToProps, null)(CommentTree);

export default CommentTree;
