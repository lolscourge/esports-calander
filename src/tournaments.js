import React, { useState } from 'react';
import MatchDetails from './MatchDetails'; // Correct path to MatchDetails component

const Tournament = ({ tournament, date }) => {
  const [showDetails, setShowDetails] = useState(false); // State to toggle match details
  const handleTournamentClick = () => {
    console.log('Tournament clicked!'); // Log to the console when the tournament is clicked
    setShowDetails(!showDetails); // Toggle the showDetails state on click
  };
  
  return (
    <div className="tournaments" onClick={handleTournamentClick} style={{ cursor: 'pointer' }}>
      <p>{tournament?.name || 'Unknown Tournament'}</p>
      
                  {showDetails && tournament &&(
                <MatchDetails matches={tournament.matches || []} date={date} />
            )}
    </div>
  );
};

export default Tournament;