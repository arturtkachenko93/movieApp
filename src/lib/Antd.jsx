import React, { Component } from 'react';
import propTypes from 'prop-types';
import debounce from 'lodash.debounce';
import {
  Alert, Spin, Input, Pagination, Result, Rate,
} from 'antd';
import { addRatingLocalStorage } from './utilits';

import 'antd/dist/antd.min.css';

function AlertMsg() {
  return (
    <Alert
      className="alert"
      message="Error"
      description="Нам чертовски жаль, но произошла ошибка вселенского масштаба ..."
      type="error"
      showIcon
    />
  );
}

function Spinner() {
  return <Spin size="large" className="spinner" />;
}

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
      title="Введите название фильма"
      subTitle="видимо, что-то пошло не так ..."
    />
  );
}

class StarRate extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    value: this.props.rating,
  };

  handleChange = (value) => {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      value,
    });
    this.props.onRate(value, this.props.id);
  };

  render() {
    return <Rate className="star-rate" onChange={this.handleChange} value={addRatingLocalStorage(this.props.id)} allowHalf count={10} />;
  }
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

StarRate.defaultProps = {
  id: 1488,
  rating: 0,
  onRate: () => {},
};

StarRate.propTypes = {
  id: propTypes.number,
  rating: propTypes.number,
  onRate: propTypes.func,
};

export {
  AlertMsg, Spinner, SearchPanel, PaginationPanel, NotFoundAlert, StarRate,
};
