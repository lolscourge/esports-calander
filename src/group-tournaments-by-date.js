const groupTournamentsByDate = (tournaments) => {
    const grouped = {};

    for (let tournament of tournaments) {
        const startDate = new Date(tournament.begin_at);
        const endDate = new Date(tournament.end_at);

        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            const dateStr = date.toISOString().split("T")[0];

            if (!grouped[dateStr]) {
                grouped[dateStr] = [];
            }

            grouped[dateStr].push(tournament);
        }
    }
    
    return grouped;
};

export default groupTournamentsByDate