import React from 'react';

function MatchDetails({ matches, date }) {
  console.log('Date:', date);
  console.log('All Matches:', matches);

  // Filter matches based on the date
  const filteredMatches = matches.filter((match) => {
    const matchDate = new Date(match.begin_at).toISOString().slice(0, -14);
    console.log('MatchDate:', matchDate)
    return matchDate === date;
  });

  console.log('Filtered Matches:', filteredMatches);

  return (
    <div>
      <h4>Group Matches</h4>
      {filteredMatches.map((match, index) => (
        <div key={index}>
          <h6>{match.name}</h6>
          {/* Render other match details here */}
        </div>
      ))}
    </div>
  );
}

export default MatchDetails;