import React from 'react';
import propTypes from 'prop-types';
import { Input } from 'antd';
import debounce from 'lodash.debounce';

import 'antd/dist/antd.min.css';

function SearchPanel({ search }) {
  const onChange = (event) => {
    const text = event.target.value;
    // eslint-disable-next-line prefer-regex-literals
    const regex = new RegExp(/^(?=.{1,64}$)\p{L}+(?:\s+\p{L}+)*$/u);
    if (regex.test(text)) {
      search(text);
    }
  };

  return <Input className="search" placeholder="Type to search..." onChange={debounce(onChange, 1000)} />;
}

SearchPanel.defaultProps = {
  search: () => {},
};

SearchPanel.propTypes = {
  search: propTypes.func,
};

export default SearchPanel;
