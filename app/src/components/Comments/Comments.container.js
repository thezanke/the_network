import Comments from './Comments';
import { connect } from 'react-redux';

import { getArticleId, rootComments, commentsLoading } from 'modules/comments';

const mapStateToProps = (state, ownProps) => ({
  comments: rootComments(state),
  loading: commentsLoading(state),
  show: ownProps.articleId === getArticleId(state)
});

export default connect(mapStateToProps, null)(Comments);
