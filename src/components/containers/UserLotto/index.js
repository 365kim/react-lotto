/* eslint-disable react/no-array-index-key */
import { Component } from 'react';
import classNames from 'classnames/bind';
import Lotto from './Lotto';
import { ToggleButton } from '../../shared';
import styles from './style.css';

const cx = classNames.bind(styles);

export default class UserLotto extends Component {
  constructor(props) {
    super(props);

    this.state = { isToggled: false };
    this.onChangeToggleButton = this.onChangeToggleButton.bind(this);
  }

  onChangeToggleButton(e) {
    this.setState({ isToggled: e.target.checked });
  }

  render() {
    const { isToggled } = this.state;
    const { lottoBundle } = this.props;
    const userLottoDisplayClass = cx({
      UserLotto__display: true,
      toggle: isToggled,
    });

    return (
      <div className="UserLotto">
        <ToggleButton onChange={this.onChangeToggleButton}>번호보기</ToggleButton>
        <p>
          총 <span className="UserLotto__number">{lottoBundle.length}</span>개 구매하였습니다.
        </p>
        <p className={userLottoDisplayClass}>
          {lottoBundle.map((v, i) => (
            <Lotto key={i} numbers={v} />
          ))}
        </p>
      </div>
    );
  }
}
