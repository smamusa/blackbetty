import React from 'react';

const Quotas = ({ match, onSlipUpdate }) => {
  return (
    <div className="quotas">
      <label className="quota" htmlFor="home-quota">
        {match.hq}
        <input
          type="radio"
          name={match.id}
          value="HOME"
          onChange={onSlipUpdate}
        />
      </label>
      <label className="quota" htmlFor="away-quota">
        {match.aq}
        <input
          type="radio"
          name={match.id}
          value="AWAY"
          onChange={onSlipUpdate}
        />
      </label>
      <label className="quota" htmlFor="tied-quota">
        {match.tq}
        <input
          type="radio"
          name={match.id}
          value="TIED"
          onChange={onSlipUpdate}
        />
      </label>
    </div>
  );
};

export default Quotas;
