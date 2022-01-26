import React from 'react';
import Quotas from './Quotas';

const Match = ({ match, onSlipUpdate }) => {
  return (
    <div className="match">
      <h3>
        {match.home} - {match.away}
      </h3>
      <Quotas match={match} onSlipUpdate={onSlipUpdate} />
    </div>
  );
};

export default Match;
