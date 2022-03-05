import React from 'react';
import propTypes from 'prop-types';
import { Pagination } from 'antd';

import 'antd/dist/antd.min.css';

function PaginationPanel({
  onPage, totalPages, currPage,
}) {
  const onChangePage = (page) => {
    onPage(page);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (<Pagination href="#top" className="pagination" onChange={onChangePage} defaultPageSize={1} current={currPage} total={totalPages} />);
}

function PaginationPanelRated({
  onPage, totalPages, currPage,
}) {
  const onChangePage = (page) => {
    onPage(page);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  return (<Pagination href="#top" className="pagination" onChange={onChangePage} defaultPageSize={1} current={currPage} total={totalPages} />);
}

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

PaginationPanelRated.defaultProps = {
  onPage: () => {},
  currPage: 1,
  totalPages: 81,
};

PaginationPanelRated.propTypes = {
  onPage: propTypes.func,
  currPage: propTypes.number,
  totalPages: propTypes.number,
};

export { PaginationPanel, PaginationPanelRated };
