-- Cria base e usa-a
CREATE DATABASE IF NOT EXISTS filmAPIlb4 DEFAULT CHARACTER SET = utf8mb4 DEFAULT COLLATE = utf8mb4_unicode_ci;
ALTER USER 'root' @'%' IDENTIFIED WITH mysql_native_password BY '12345678';
FLUSH PRIVILEGES;
USE filmAPIlb4;
-- Directors
CREATE TABLE IF NOT EXISTS directors (
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	birthdate VARCHAR(50) NULL,
	country VARCHAR(100) NULL,
	PRIMARY KEY (id),
	INDEX idx_directors_name (name)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- Genres
CREATE TABLE IF NOT EXISTS genres (
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- Actors
CREATE TABLE IF NOT EXISTS actors (
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	birthdate VARCHAR(50) NULL,
	country VARCHAR(100) NULL,
	PRIMARY KEY (id),
	INDEX idx_actors_name (name)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- Films
CREATE TABLE IF NOT EXISTS films (
	id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
	title VARCHAR(255) NOT NULL,
	year INT NULL,
	directorsId BIGINT UNSIGNED NULL,
	genresId BIGINT UNSIGNED NULL,
	PRIMARY KEY (id),
	INDEX idx_films_title (title),
	INDEX idx_films_year (year),
	INDEX idx_films_director (directorsId),
	INDEX idx_films_genre (genresId),
	CONSTRAINT fk_films_director FOREIGN KEY (directorsId) REFERENCES directors(id) ON DELETE
	SET NULL ON UPDATE CASCADE,
		CONSTRAINT fk_films_genre FOREIGN KEY (genresId) REFERENCES genres(id) ON DELETE
	SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- FilmActors (relação muitos-para-muitos entre films e actors)
CREATE TABLE IF NOT EXISTS film_actors (
	filmsId BIGINT UNSIGNED NOT NULL,
	actorsId BIGINT UNSIGNED NOT NULL,
	-- role VARCHAR(255) NOT NULL,
	PRIMARY KEY (filmsId, actorsId),
	INDEX idx_fa_actor (actorsId),
	CONSTRAINT fk_film_actors_film FOREIGN KEY (filmsId) REFERENCES films(id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_film_actors_actor FOREIGN KEY (actorsId) REFERENCES actors(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ------------------------------------------------------------------------------
-- Inserts de exemplo
-- ------------------------------------------------------------------------------
-- ====== 30 GENRES ======
INSERT INTO genres (id, name)
VALUES (1, 'Drama'),
	(2, 'Crime'),
	(3, 'Action'),
	(4, 'Adventure'),
	(5, 'Thriller'),
	(6, 'Biography'),
	(7, 'History'),
	(8, 'War'),
	(9, 'Romance'),
	(10, 'Comedy'),
	(11, 'Mystery'),
	(12, 'Fantasy'),
	(13, 'Sci-Fi'),
	(14, 'Animation'),
	(15, 'Family'),
	(16, 'Music'),
	(17, 'Musical'),
	(18, 'Horror'),
	(19, 'Western'),
	(20, 'Sport'),
	(21, 'Documentary'),
	(22, 'Film-Noir'),
	(23, 'Superhero'),
	(24, 'Psychological Thriller'),
	(25, 'Romantic Comedy'),
	(26, 'Historical Drama'),
	(27, 'Crime Thriller'),
	(28, 'Epic'),
	(29, 'Adventure Fantasy'),
	(30, 'Animation Fantasy');
-- ====== 30 DIRECTORS ======
INSERT INTO directors (id, name, birthdate, country)
VALUES (
		1,
		'Frank Darabont',
		'1959-01-28',
		'United States'
	),
	(
		2,
		'Francis Ford Coppola',
		'1939-04-07',
		'United States'
	),
	(
		3,
		'Christopher Nolan',
		'1970-07-30',
		'United Kingdom'
	),
	(4, 'Sidney Lumet', '1924-06-25', 'United States'),
	(
		5,
		'Steven Spielberg',
		'1946-12-18',
		'United States'
	),
	(6, 'Peter Jackson', '1961-10-31', 'New Zealand'),
	(
		7,
		'Quentin Tarantino',
		'1963-03-27',
		'United States'
	),
	(8, 'Sergio Leone', '1929-01-03', 'Italy'),
	(
		9,
		'David Fincher',
		'1962-08-28',
		'United States'
	),
	(
		10,
		'Robert Zemeckis',
		'1952-05-14',
		'United States'
	),
	(
		11,
		'Irvin Kershner',
		'1923-04-29',
		'United States'
	),
	(12, 'The Wachowskis', NULL, 'United States'),
	(
		13,
		'Martin Scorsese',
		'1942-11-17',
		'United States'
	),
	(
		14,
		'Miloš Forman',
		'1932-02-18',
		'Czech Republic'
	),
	(15, 'Akira Kurosawa', '1910-03-23', 'Japan'),
	(16, 'Fernando Meirelles', '1955-11-09', 'Brazil'),
	(
		17,
		'Jonathan Demme',
		'1944-02-22',
		'United States'
	),
	(18, 'Frank Capra', '1897-05-18', 'United States'),
	(19, 'Roberto Benigni', '1952-10-27', 'Italy'),
	(
		20,
		'Bryan Singer',
		'1965-09-17',
		'United States'
	),
	(21, 'Luc Besson', '1959-03-18', 'France'),
	(22, 'Hayao Miyazaki', '1941-01-05', 'Japan'),
	(
		23,
		'Stanley Kubrick',
		'1928-07-26',
		'United States'
	),
	(24, 'Woody Allen', '1935-11-30', 'United States'),
	(25, 'James Cameron', '1954-08-16', 'Canada'),
	(26, 'Alfonso Cuarón', '1961-11-28', 'Mexico'),
	(27, 'Ang Lee', '1954-10-23', 'Taiwan'),
	(28, 'Joel & Ethan Coen', NULL, 'United States'),
	(29, 'Denis Villeneuve', '1967-10-03', 'Canada'),
	(
		30,
		'Greta Gerwig',
		'1983-08-04',
		'United States'
	);
-- ====== 30 ACTORS ======
INSERT INTO actors (id, name, birthdate, country)
VALUES (1, 'Tim Robbins', '1958-10-16', 'United States'),
	(
		2,
		'Morgan Freeman',
		'1937-06-01',
		'United States'
	),
	(
		3,
		'Marlon Brando',
		'1924-04-03',
		'United States'
	),
	(4, 'Al Pacino', '1940-04-25', 'United States'),
	(
		5,
		'Christian Bale',
		'1974-01-30',
		'United Kingdom'
	),
	(6, 'Heath Ledger', '1979-04-04', 'Australia'),
	(
		7,
		'Robert De Niro',
		'1943-08-17',
		'United States'
	),
	(
		8,
		'Leonardo DiCaprio',
		'1974-11-11',
		'United States'
	),
	(9, 'Brad Pitt', '1963-12-18', 'United States'),
	(
		10,
		'Edward Norton',
		'1969-08-18',
		'United States'
	),
	(11, 'Tom Hanks', '1956-07-09', 'United States'),
	(12, 'Elijah Wood', '1981-01-28', 'United States'),
	(
		13,
		'John Travolta',
		'1954-02-18',
		'United States'
	),
	(
		14,
		'Clint Eastwood',
		'1930-05-31',
		'United States'
	),
	(15, 'Keanu Reeves', '1964-09-02', 'Canada'),
	(16, 'Ray Liotta', '1954-12-18', 'United States'),
	(
		17,
		'Jack Nicholson',
		'1937-04-22',
		'United States'
	),
	(
		18,
		'Nicolas Cage',
		'1964-01-07',
		'United States'
	),
	(19, 'Toshiro Mifune', '1920-04-01', 'Japan'),
	(
		20,
		'Wesley Snipes',
		'1962-07-31',
		'United States'
	),
	(21, 'Cillian Murphy', '1976-05-25', 'Ireland'),
	(
		22,
		'Joaquin Phoenix',
		'1974-10-28',
		'United States'
	),
	(
		23,
		'James Stewart',
		'1908-05-20',
		'United States'
	),
	(24, 'Roberto Benigni', '1952-10-27', 'Italy'),
	(
		25,
		'Benicio Del Toro',
		'1967-02-19',
		'Puerto Rico'
	),
	(26, 'Jean Reno', '1948-07-30', 'France'),
	(27, 'Matt Damon', '1970-10-08', 'United States'),
	(28, 'Rumi Hiiragi', '1987-08-01', 'Japan'),
	(
		29,
		'Michael Clarke Duncan',
		'1957-12-10',
		'United States'
	),
	(
		30,
		'Matthew McConaughey',
		'1969-11-04',
		'United States'
	);
-- ====== 30 FILMS (id, title, year, directorsId, genresId) ======
INSERT INTO films (id, title, year, directorsId, genresId)
VALUES (1, 'The Shawshank Redemption', 1994, 1, 1),
	(2, 'The Godfather', 1972, 2, 2),
	(3, 'The Dark Knight', 2008, 3, 23),
	(4, 'The Godfather: Part II', 1974, 2, 2),
	(5, '12 Angry Men', 1957, 4, 1),
	(6, 'Schindler''s List', 1993, 5, 6),
	(
		7,
		'The Lord of the Rings: The Return of the King',
		2003,
		6,
		28
	),
	(8, 'Pulp Fiction', 1994, 7, 10),
	(9, 'The Good, the Bad and the Ugly', 1966, 8, 19),
	(
		10,
		'The Lord of the Rings: The Fellowship of the Ring',
		2001,
		6,
		12
	),
	(11, 'Fight Club', 1999, 9, 24),
	(12, 'Forrest Gump', 1994, 10, 1),
	(13, 'Inception', 2010, 3, 13),
	(
		14,
		'The Lord of the Rings: The Two Towers',
		2002,
		6,
		12
	),
	(
		15,
		'Star Wars: Episode V - The Empire Strikes Back',
		1980,
		11,
		4
	),
	(16, 'The Matrix', 1999, 12, 13),
	(17, 'Goodfellas', 1990, 13, 2),
	(
		18,
		'One Flew Over the Cuckoo''s Nest',
		1975,
		14,
		1
	),
	(19, 'Seven Samurai', 1954, 15, 4),
	(20, 'Se7en', 1995, 9, 5),
	(21, 'City of God', 2002, 16, 1),
	(22, 'The Silence of the Lambs', 1991, 17, 5),
	(23, 'It''s a Wonderful Life', 1946, 18, 15),
	(24, 'Life Is Beautiful', 1997, 19, 9),
	(25, 'The Usual Suspects', 1995, 20, 11),
	(26, 'Léon: The Professional', 1994, 21, 2),
	(27, 'Saving Private Ryan', 1998, 5, 8),
	(28, 'Spirited Away', 2001, 22, 14),
	(29, 'The Green Mile', 1999, 1, 1),
	(30, 'Interstellar', 2014, 3, 13);
-- ====== 30 FILM_ACTORS (filmsId, actorsId, role) ======
INSERT INTO film_actors (filmsId, actorsId)
VALUES (1, 1),
	(1, 2),
	(2, 3),
	(2, 4),
	(3, 5),
	(3, 6),
	(4, 4),
	(5, 17),
	(6, 11),
	(7, 12),
	(8, 13),
	(9, 14),
	(10, 12),
	(11, 10),
	(12, 11),
	(13, 5),
	(14, 12),
	(15, 20),
	(16, 15),
	(17, 7),
	(18, 23),
	(19, 19),
	(20, 10),
	(21, 21),
	(22, 25),
	(23, 23),
	(24, 24),
	(25, 25),
	(26, 26),
	(27, 27),
	(28, 28),
	(29, 29),
	(30, 30);
