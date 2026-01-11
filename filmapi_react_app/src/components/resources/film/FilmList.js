import { use } from 'react';
import { List, Datagrid, TextField, NumberField, ReferenceField, EditButton, TextInput, NumberInput, SearchInput } from 'react-admin';


const filmFilters = [
	<SearchInput source="title" alwaysOn />,
	<NumberInput source="year" label="Year" />,
	<TextInput source="directorsId" label="Directors" />,
	<TextInput source="genresId" label="Genre" />
];


export const FilmList = () => (
	<List filters={filmFilters}>
		<Datagrid rowClick="show">
			<NumberField source="id" />
			<TextField source="title" />
			<NumberField source="year" />
			<ReferenceField source="directorsId" reference="directors" />
			<ReferenceField source="genresId" reference="genres" />
			<EditButton />
		</Datagrid>
	</List>

);
