import Comments from './Comments';
import { connect } from 'react-redux';

import { getArticleId, getComments, commentsLoading } from 'modules/comments';

const mapStateToProps = (state, props) => ({
  comments: getComments(state, props),
  loading: commentsLoading(state),
  show: props.articleId === getArticleId(state)
});

export default connect(mapStateToProps, null)(Comments);
