import React from 'react';

export default ({ checked }) => <div className={`checkbox-figure checkbox-figure__${checked ? 'checked' : 'unchecked'}`} />;
