document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'http://localhost:3000';
    const filmsList = document.getElementById('films');
    const moviePoster = document.getElementById('poster');
    const movieTitle = document.getElementById('title');
    const movieRuntime = document.getElementById('runtime');
    const movieShowtime = document.getElementById('showtime');
    const availableTickets = document.getElementById('ticket-num');
    const buyTicketButton = document.getElementById('buy-ticket');

    const fetchMovieDetails = async (filmId) => {
        try {
            const response = await fetch(`${baseURL}/films/${filmId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch movie details');
            }
            const movieData = await response.json();

            moviePoster.src = movieData.poster;
            movieTitle.textContent = movieData.title;
            movieRuntime.textContent = `${movieData.runtime} minutes`;
            movieShowtime.textContent = `Showtime: ${movieData.showtime}`;
            const remainingTickets = movieData.capacity - movieData.tickets_sold;
            availableTickets.textContent = `${remainingTickets} remaining tickets`;

            if (remainingTickets > 0) {
                buyTicketButton.disabled = false;
                buyTicketButton.textContent = 'Buy Ticket';
            } else {
                buyTicketButton.disabled = true;
                buyTicketButton.textContent = 'Sold Out';
            }
        } catch (error) {
            console.error('Error fetching movie details:', error.message);
        }
    };

    const fetchMovieList = async () => {
        try {
            const response = await fetch(`${baseURL}/films`);
            if (!response.ok) {
                throw new Error('Failed to fetch movie list');
            }
            const movieList = await response.json();

            filmsList.innerHTML = '';
            movieList.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie.title;
                li.classList.add('film', 'item');
                li.dataset.id = movie.id;
                li.addEventListener('click', () => fetchMovieDetails(movie.id));
                filmsList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching movie list:', error.message);
        }
    };

    fetchMovieList();
    fetchMovieDetails(1);

    buyTicketButton.addEventListener('click', async () => {
        const response = await fetch(`${baseURL}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ film_id: 1, number_of_tickets: 1 })
        });
        if (response.ok) {
            fetchMovieDetails(1);
        } else {
            console.error('Failed to buy ticket');
            alert('Failed to buy ticket. Please try again.');
        }
    });

    

    const processMovieData = (title, runtime) => {
        console.log(`Movie Title: ${title}`);
        console.log(`Runtime: ${runtime} minutes`);
        // Perform other tasks as needed with movie data
    };

    filmsData.films.forEach((film) => processMovieData(film.title, film.runtime));
});