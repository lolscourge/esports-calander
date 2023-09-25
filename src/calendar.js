import React, { useState, useEffect } from 'react';
import Day from './day';
import groupTournamentsByDate from './group-tournaments-by-date';
import axios from 'axios';
import './calendar.css';

const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();
const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
const daysInMonth = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1);
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const currentMonthName = monthNames[currentMonth];

const Calendar = () => {
  console.log('Calendar Component Rendered');
  const [tournaments, setTournaments] = useState([]);
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().slice(0, -5) + "Z"; //because pandascore's a slag and doesn't use .000 milisecconds for ISO dates
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().slice(0, -5) + "Z";

  useEffect(() => {
    const GAMES = ['csgo', 'dota2', 'lol']; // Include all the games you want to fetch
    const FORMAT = 'tournaments'; // Single string as it is constant across requests
    const API_KEY = process.env.REACT_APP_PANDASCORE_API_KEY;

    console.log('API KEY Variable:',process.env.REACT_APP_PANDASCORE_API_KEY);
    console.log('Test Variable:', process.env.REACT_APP_TEST_VARIABLE); 

    const fetchDataForGame = (game) => {
      const API_ENDPOINT = `https://api.pandascore.co/${game}/${FORMAT}`;
  
      return axios.get(API_ENDPOINT, {
          headers: {
              'Authorization': `Bearer ${API_KEY}`
          },
          params: {
              'filter[tier]': 'a',
              'range[begin_at]': `${startOfMonth},${endOfMonth}`
          }
      })
      .then(response => {
          console.log("Received data:", response.data);
          return response.data;
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
    };

    // Map over GAMES array to create an array of Promises
    Promise.all(GAMES.map(fetchDataForGame))
    .then(responses => {
        const allTournaments = [].concat(...responses); // Flatten the array of arrays
        const groupedTournamentsByDate = groupTournamentsByDate(allTournaments);
        setTournaments(groupedTournamentsByDate);
    });

  }, [endOfMonth, startOfMonth]);

return (
    <div className="calendar">
        <h1>Esports Calendar for {currentMonthName}</h1>
        <div className="calendar-grid">
            {daysOfWeek.map((dayName) => (
                <div key={dayName} className="day-header">{dayName}</div>
            ))}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`empty-${i}`} className="empty-day"></div>
            ))}
            {daysInMonth.map((day) => {
                const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Format the date
                console.log(formattedDate)
                const dayTournaments = tournaments[formattedDate] || [];
                
                return <Day key={day} date={formattedDate} tournaments={dayTournaments} />
            })}
        </div>
    </div>
  )};

export default Calendar;