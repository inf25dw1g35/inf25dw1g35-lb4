import './App.css';
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import { defaultTheme, nanoTheme, radiantLightTheme, radiantDarkTheme, houseLightTheme, houseDarkTheme, useTheme } from 'ra-ui-materialui';
import lb4Provider from 'react-admin-lb4';
import { FilmList } from './components/resources/film/FilmList';
import { ActorList } from './components/resources/actor/ActorList';
import { FilmEdit } from './components/resources/film/FilmEdit';
import { ActorEdit } from './components/resources/actor/ActorEdit';
import { DirectorList } from './components/resources/director/DirectorList';
import { DirectorEdit } from './components/resources/director/DirectorEdit';
import { GenreList } from './components/resources/genre/GenreList';
import { GenreEdit } from './components/resources/genre/GenreEdit';
import { dashboard } from './components/dashboard';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FilmCreate from './components/resources/film/FilmCreate';
import ActorCreate from './components/resources/actor/ActorCreate';
import DirectorCreate from './components/resources/director/DirectorCreate';
import GenreCreate from './components/resources/genre/GenreCreate';
import { FilmShow } from './components/resources/film/FilmShow';
import { DirectorShow } from './components/resources/director/DirectorShow';
import { ActorShow } from './components/resources/actor/ActorShow';
import { GenreShow } from './components/resources/genre/GenreShow';


const dataProvider = lb4Provider('http://localhost:3000/');

// Simple authProvider for demonstration purposes
const authProvider = {
	async login({ username, password }) {
		if (username !== 'demo' || password !== 'demo') {
			throw new Error('Login failed');
		}
		localStorage.setItem('username', username);
	},
	async checkError(error) {
		const status = error.status;
		if (status === 401 || status === 403) {
			localStorage.removeItem('username');
			throw new Error('Session expired');
		}
		// other error codes (404, 500, etc): no need to log out
	},
	async checkAuth() {
		if (!localStorage.getItem('username')) {
			throw new Error('Not authenticated');
		}
	},
	async logout() {
		localStorage.removeItem('username');
	},
	async getIdentity() {
		const username = localStorage.getItem('username');
		return { id: username, fullName: username };
	},
};

function App() {


	return (
		<div className="App">

			<Admin dashboard={dashboard} dataProvider={dataProvider} authProvider={authProvider} theme={houseLightTheme} darkTheme={houseDarkTheme}>
				<Resource name="films" icon={LocalMoviesIcon} list={FilmList} edit={FilmEdit} create={FilmCreate} show={FilmShow} />
				<Resource name="actors" icon={PeopleAltIcon} list={ActorList} edit={ActorEdit} create={ActorCreate} show={ActorShow} />
				<Resource name="directors" icon={MovieOutlinedIcon} list={DirectorList} edit={DirectorEdit} create={DirectorCreate} show={DirectorShow} />
				<Resource name="genres" icon={AssignmentIcon} list={GenreList} edit={GenreEdit} create={GenreCreate} show={GenreShow} />
			</Admin>

		</div>
	);
}

export default App;
