import React, { Component } from 'react';
import { Rate } from 'antd';
import propTypes from 'prop-types';
import { addRatingLocalStorage } from '../../utils/utilits';

import 'antd/dist/antd.min.css';

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

export default StarRate;
