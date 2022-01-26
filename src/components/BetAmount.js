import React, { useState } from 'react';
const BetAmount = ({ updateBetslip, betslip }) => {
  // eslint-disable-next-line
  const [inputState, setInput] = useState('');
  let betslipPayload = {};
  const updatePayload = (e) => {
    setInput(e.target.value);
    betslipPayload = {
      ...betslip,
      amount: e.target.value,
    };
    updateBetslip(betslipPayload);
  };
  return (
    <div className="betamount">
      <label>Bet amount</label>
      <div>
        <span>&euro; </span>
        <input name="amount" type="text" onChange={updatePayload}></input>
      </div>
    </div>
  );
};

export default BetAmount;
