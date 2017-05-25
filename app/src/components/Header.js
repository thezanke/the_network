import React from 'react';

export default ({ channel }) => (
  <div>
    <h1>{channel.name}</h1>
    <h3>{channel.description}</h3>
  </div>
);
