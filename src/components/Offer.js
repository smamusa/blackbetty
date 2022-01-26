import React from 'react';
import BetslipSumbit from './BetslipSubmit';
import BetAmount from './BetAmount';
import Match from './Match';

const Offer = ({
  offer,
  onSlipUpdate,
  betslip,
  updateBetslip,
  updatePlayerData,
}) => {
  // Check that betslip contains at least one played match (Home, Away or Tied)
  const validateBetslip = (betslip) => {
    // Validate betslip has at least 1 match selected
    if (!(betslip.matches != null && betslip.matches.length > 0)) {
      alert('Please select at least one outcome');
      return false;
    }
    // Validate betslip amount is present at that it's a number
    if (
      betslip.amount === null ||
      betslip.amount.length < 0 ||
      isNaN(betslip.amount)
    ) {
      alert('Please enter a valid amount');
      return false;
    }
    return true;
  };

  const postBetslip = async (betslip) => {
    await fetch('http://localhost:8080/api/betslips/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(betslip),
    });
  };

  // Place betsplit
  const placeBetslip = async (e) => {
    e.preventDefault();
    if (!validateBetslip(betslip)) {
      return;
    }
    await postBetslip(betslip);
    updatePlayerData(betslip);
  };

  return (
    <form className="offer" onSubmit={placeBetslip}>
      {offer.map((match) => (
        <Match key={match.id} match={match} onSlipUpdate={onSlipUpdate} />
      ))}
      <BetAmount updateBetslip={updateBetslip} betslip={betslip} />
      <BetslipSumbit />
    </form>
  );
};

export default Offer;
