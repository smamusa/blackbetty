import React, { useEffect, useState } from 'react';
import Betslip from './Betslip';
import Legend from './Legend';

const Betslips = ({ fetchPlayer, fetchBetslipMatches }) => {
  const [betslips, setBetslips] = useState([]);
  useEffect(() => {
    const getBetslips = async () => {
      const data = await fetchPlayer();
      setBetslips(data.betslips);
    };
    getBetslips();
  }, [fetchPlayer]);

  return (
    <div>
      <Legend />
      {betslips.map((betslip) => (
        <Betslip key={betslip.id} betslip={betslip} />
      ))}
    </div>
  );
};

export default Betslips;
