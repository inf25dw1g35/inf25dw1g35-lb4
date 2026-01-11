import { Datagrid, NumberField, TextField, DateField, EditButton, List, SearchInput, DateInput, TextInput } from 'react-admin';

const directorFilters = [
	<SearchInput source="name" alwaysOn />,
	<DateInput source="birthdate" label="Birthdate" />,
	<TextInput source="country" label="Country" />
];

export const DirectorList = () => (
	<List filters={directorFilters}>
		<Datagrid rowClick="show">
			<NumberField source="id" />
			<TextField source="name" />
			<DateField source="birthdate" />
			<TextField source="country" />
			<EditButton />
		</Datagrid>
	</List>
);
