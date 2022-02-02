import React, { Component } from 'react';
import propTypes from 'prop-types';
import debounce from 'lodash.debounce';

import {
  Alert, Spin, Input, Pagination, Result,
} from 'antd';
import 'antd/dist/antd.css';

function AlertMsg() {
  return (
    <Alert
      className="alert"
      message="Error"
      description="EVENT_ZALOOP"
      type="error"
      showIcon
    />
  );
}

function Spinner() {
  return <Spin size="large" className="spinner" />;
}

class SearchPanel extends Component {
  onChange = (e) => {
    const text = e.target.value;
    // eslint-disable-next-line prefer-regex-literals
    const regex = new RegExp(/^(?=.{1,64}$)\p{L}+(?:\s+\p{L}+)*$/u);
    if (regex.test(text)) {
      this.props.search(text);
    }
  };

  render() {
    return <Input className="search" placeholder="Type to search..." onChange={debounce(this.onChange, 1000)} />;
  }
}

function PaginationPanel({ onPage, totalPages, currPage }) {
  const onChangePage = (page) => {
    onPage(page);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (<Pagination href="#top" className="pagination" onChange={onChangePage} current={currPage} total={totalPages} />);
}

function NotFoundAlert() {
  return (
    <Result
      status="404"
      title="Ебать ты лох"
      subTitle=""
    />
  );
}

SearchPanel.defaultProps = {
  search: () => {},
};

SearchPanel.propTypes = {
  search: propTypes.func,
};

PaginationPanel.defaultProps = {
  onPage: () => {},
  currPage: 1,
  totalPages: 81,
};

PaginationPanel.propTypes = {
  onPage: propTypes.func,
  currPage: propTypes.number,
  totalPages: propTypes.number,
};

export {
  AlertMsg, Spinner, SearchPanel, PaginationPanel, NotFoundAlert,
};
