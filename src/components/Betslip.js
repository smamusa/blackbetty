import React, { useEffect, useState } from 'react';
import PlayedMatch from './PlayedMatch';

const Betslip = ({ betslip }) => {
  const [totalQuotient, setQuotient] = useState(1);
  const [potentialWinning, setPotentialWinning] = useState(0);

  useEffect(() => {
    setPotentialWinning(Math.round(totalQuotient * betslip.amount * 100) / 100);
    // eslint-disable-next-line
  }, [totalQuotient, potentialWinning]);

  // Converts UNIX timestamp to European date-time format
  const convertToDate = (timestamp) => {
    const playedDate = new Date(timestamp);
    return (
      playedDate.getDate() +
      '.' +
      playedDate.getMonth() +
      1 +
      '.' +
      playedDate.getFullYear() +
      ' - ' +
      playedDate.getHours() +
      ':' +
      playedDate.getMinutes() +
      ':' +
      playedDate.getSeconds()
    );
  };

  const calculateTotalQuotient = (matchQuotient) => {
    setQuotient(
      (totalQuotient) => Math.round(totalQuotient * matchQuotient * 100) / 100
    );
  };

  return (
    <div>
      <h1 key={betslip.id} className="betslip">
        {convertToDate(betslip.createdTime)}
        <p>Potential Winning : &euro; {potentialWinning}</p>
      </h1>
      <div className="matches">
        {betslip.matches.map((match) => (
          <PlayedMatch
            key={match.id}
            match={match}
            calcTotal={calculateTotalQuotient}
          />
        ))}
        <div className="betslipInfo tied">
          <h4>Bet amount : &euro; {betslip.amount}</h4>
          <h4>Total Quotient : {totalQuotient}</h4>
        </div>
      </div>
    </div>
  );
};

export default Betslip;
