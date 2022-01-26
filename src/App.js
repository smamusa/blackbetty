import './index.css';
import logo from './logo.png';
import Offer from './components/Offer';
import Wallet from './components/Wallet';
import MyBetslips from './components/MyBetslips';
import Betslips from './components/Betslips';
import Legend from './components/Legend';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  const [offer, setOffer] = useState([]);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const getOffer = async () => {
      const offer = await fetchOffer();
      setOffer(offer);
    };
    const getWallet = async () => {
      const player = await fetchPlayer();
      setWallet(player.wallet);
    };
    getOffer();
    getWallet();
  }, []);

  // Get matches that are playing
  const fetchOffer = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/offer`);
    const data = await res.json();
    return data;
  };

  // Get player data
  const fetchPlayer = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_SERVER_URL}/players/1`
    );
    const data = await res.json();
    return data;
  };

  const fetchBetslipMatches = async (betslipUuid) => {
    const data = await fetchPlayer();
    const matches = data.betslips.filter(
      (betslip) => betslip.id === betslipUuid
    )[0].matches;
    return matches;
  };

  // Update player data in DB
  const updatePlayerData = async () => {
    const playerData = await fetchPlayer();
    // Update Wallet UI
    setWallet(playerData.wallet);
  };

  const [currentBetslip, updateBetslip] = useState({
    amount: null,
    matches: [],
  });

  const onSlipUpdate = (e) => {
    updateBetslip({
      ...currentBetslip,
      matches: [
        ...currentBetslip.matches,
        { offerId: e.target.name, playedQuotient: e.target.value },
      ],
    });
  };

  return (
    <Router>
      <div className="container">
        <header className="header">
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
            <div className="welcome">
              <img src={logo} alt="logo" />
              <div>
                <h1>Black Betty</h1>
                <p>Bet on Black!</p>
              </div>
            </div>
          </Link>
          <Wallet wallet={wallet} />
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="subHeader">
                  <h2>Teams</h2>
                  <h2>Quotients</h2>
                </div>
                <Legend />
                {offer.length > 0 ? (
                  <Offer
                    offer={offer}
                    onSlipUpdate={onSlipUpdate}
                    betslip={currentBetslip}
                    updateBetslip={updateBetslip}
                    updatePlayerData={updatePlayerData}
                  />
                ) : (
                  'No Matches Playing'
                )}
                <MyBetslips />
              </>
            }
          />
          <Route
            path="/player/betslips"
            element={
              <Betslips
                fetchPlayer={fetchPlayer}
                fetchBetslipMatches={fetchBetslipMatches}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
