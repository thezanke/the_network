import React from 'react';

export default ({ loading, comments, show }) => {
  if (show) {
    if (loading) return <div>Loading comments...</div>;

    return (
      <div>
        {comments.length
          ? comments.map(comment => (
              <div key={comment.id}>
                <pre>{JSON.stringify(comment, null, 2)}</pre>
              </div>
            ))
          : 'No comments 😢'}
      </div>
    );
  } else {
    return null;
  }
};
