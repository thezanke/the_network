import React from 'react';

export default ({ comments }) => (
  <div><pre>{JSON.stringify(comments, null, 2)}</pre></div>
);
