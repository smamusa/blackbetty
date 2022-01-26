import React from 'react';

const Wallet = ({ wallet }) => {
  return (
    <div className="wallet">
      <h4>Wallet</h4>
      <p>&euro; {wallet}</p>
    </div>
  );
};

export default Wallet;
