import { Datagrid, NumberField, TextField, DateField, EditButton, List, SearchInput, TextInput, DateInput } from 'react-admin';

const actorFilters = [
	<SearchInput source="name" alwaysOn />,
	<DateInput source="birthdate" label="Birthdate" />,
	<TextInput source="country" label="Country" />
];

export const ActorList = () => (
	<List filters={actorFilters}>
		<Datagrid rowClick="show">
			<NumberField source="id" />
			<TextField source="name" />
			<DateField source="birthdate" />
			<TextField source="country" />
			<EditButton />
		</Datagrid>
	</List>
);
