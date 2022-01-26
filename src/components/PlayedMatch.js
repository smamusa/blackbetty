import React, { useEffect } from 'react';

const PlayedMatch = ({ calcTotal, match }) => {
  const getQuotient = (match) => {
    if (match.playedQuotient === 'HOME') {
      return match.offer.hq;
    } else if (match.playedQuotient === 'AWAY') {
      return match.offer.aq;
    } else return match.offer.tq;
  };

  useEffect(() => {
    calcTotal(getQuotient(match));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="match">
      <h3>
        {match.offer.home} - {match.offer.away}
      </h3>
      <p
        className={`quota played ${(() => {
          if (match.playedQuotient === 'HOME') {
            return 'home';
          } else if (match.playedQuotient === 'AWAY') {
            return 'away';
          } else return 'tied';
        })()}`}
      >
        {getQuotient(match)}
      </p>
    </div>
  );
};

export default PlayedMatch;
