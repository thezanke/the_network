import React from 'react';

import CommentTree from 'components/CommentTree';

export default ({ loading, comments, show }) => {
  if (show) {
    if (loading) return <div>Loading comments...</div>;

    const hasComments = comments.length > 0;

    return (
      <div>
        {hasComments
          ? <CommentTree comments={comments} />
          : <div>
              {'No comments to display '}
              <span role="img" aria-label="sadface">😢</span>
            </div>}
      </div>
    );
  } else {
    return null;
  }
};
