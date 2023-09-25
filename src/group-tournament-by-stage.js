const groupTournamentsByStage = (tournaments) => {
    return tournaments.reduce((acc, tournament) => {
        const gameName = tournament?.videogame?.name || 'Unknown Game';
        const leagueName = tournament?.league?.name || 'Unknown League';
        const key = `${gameName}-${leagueName}`; // Combine game and league as a key

        if (!acc[key]) acc[key] = { gameName, leagueName, tournaments: [] };

        acc[key].tournaments.push(tournament);
        return acc;
    }, {});
};
export default groupTournamentsByStage;