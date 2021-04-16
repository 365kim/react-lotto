import React, { Component } from 'react';
// import Lottie from 'lottie-react-web';
// import congrat from '../animations/congrat.json';
import '../css/purchase-amount.css';
import { LOTTO_UNIT_PRICE, MIN_MONETARY_UNIT } from '../constants/lottoRules.js';
import { MESSAGE } from '../constants/display.js';

export default class PurchaseAmount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationMessage: '',
      isInputDisabled: false,
      isSubmitButtonDisabled: true,
    };
    this.purchaseAmountInput = React.createRef();
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.purchaseAmountInput.current.focus();
  }

  componentDidUpdate() {
    if (this.props.isReset) {
      this.purchaseAmountInput.current.value = '';
      this.purchaseAmountInput.current.disabled = false;
      this.purchaseAmountInput.current.focus();
      this.props.didReset();
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const purchaseAmount = e.target.input.value;
    const change = purchaseAmount % LOTTO_UNIT_PRICE;
    const numOfLotto = (purchaseAmount - change) / LOTTO_UNIT_PRICE;

    if (change > 0) {
      alert(MESSAGE.PURCHASE_AMOUNT_HAS_CHANGE(change));
    }

    this.props.onPurchaseLotto({ numOfLotto });
    this.setState({ isInputDisabled: true, isSubmitButtonDisabled: true });
  }

  onChangeInput(e) {
    const currentInputValue = e.target.value;

    if (currentInputValue % MIN_MONETARY_UNIT > 0) {
      this.setState({
        validationMessage: MESSAGE.INVALID_PURCHASE_AMOUNT_UNDER_MONETARY_UNIT,
        isSubmitButtonDisabled: true,
      });
      return;
    }

    if (currentInputValue < LOTTO_UNIT_PRICE) {
      this.setState({
        validationMessage: MESSAGE.INVALID_PURCHASE_AMOUNT_UNDER_LOTTO_UNIT_PRICE,
        isSubmitButtonDisabled: true,
      });
      return;
    }

    this.setState({
      validationMessage: '',
      isSubmitButtonDisabled: false,
    });
  }

  render() {
    return (
      <div>
        <form className="purchase-amount-container" onSubmit={this.onSubmit}>
          <label htmlFor="purchase-amount-input" className="purchase-amount-label">
            <span className="purchase-amount-text">구입할 금액을 입력해주세요.</span>
            <input
              id="purchase-amount-input"
              name="input"
              type="number"
              placeholder="구입 금액"
              onChange={this.onChangeInput}
              ref={this.purchaseAmountInput}
              disabled={this.state.isInputDisabled}
              required
            />
          </label>
          <button type="submit" className="purchase-amount-submit-button" disabled={this.state.isSubmitButtonDisabled}>
            확인
          </button>
          <div>{this.state.validationMessage}</div>
        </form>
      </div>
    );
  }
}

// // TODO: 애니메이션 추가
// const isPurchased = Boolean(this.props.lottoBundle.length);

// const lottie = (
//   <Lottie
//     speed={isPurchased ? 1 : 0}
//     options={{
//       animationData: congrat,
//       loop: false,
//     }}
//   />
// );