import React from 'react'; // Import useState
import Tournament from './tournaments';
import groupTournamentsByStage from './group-tournament-by-stage';
import { sanitizeGameName } from './sanitize-game-name';

const Day = ({ date, tournaments = [] }) => {
    console.log('Day Component Rendered', date, tournaments);

    const groupedTournamentsByStage = groupTournamentsByStage(tournaments);
    const DayNumber = parseInt(date.split('-')[2], 10);

    return (
        <div className="day">
            <h2>{DayNumber}</h2>
            {Object.values(groupedTournamentsByStage).map(({ gameName, leagueName, tournaments }) => {
                const gameCSS = `game-group-${sanitizeGameName(gameName)}`;
                return (
                    <div className={gameCSS} key={`${gameName}-${leagueName}`}>
                        <h3>{gameName}</h3>
                        <h4>{leagueName}</h4>
                        {tournaments.map((tournament) => (
                            <Tournament
                                key={tournament.id}
                                tournament={tournament}
                                date = {date}
                                // Update the state variables here when needed

                            />
                        ))}
                    </div>
                );
            })}
            

        </div>
    );
};

export default Day;