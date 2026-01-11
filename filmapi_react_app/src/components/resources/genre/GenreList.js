import { List, Datagrid, TextField, NumberField, ReferenceField, EditButton, SearchInput } from 'react-admin';

const genreFilters = [
	<SearchInput source="name" alwaysOn />,
];

export const GenreList = () => (
	<List filters={genreFilters}>
		<Datagrid rowClick="show">
			<NumberField source="id" />
			<TextField source="name" />
			<EditButton />
		</Datagrid>
	</List>
);
