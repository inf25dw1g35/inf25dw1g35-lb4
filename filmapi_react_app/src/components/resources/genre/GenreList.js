import { List, Datagrid, TextField, NumberField, ReferenceField, EditButton } from 'react-admin';

export const GenreList = () => (
	<List>
		<Datagrid rowClick="show">
			<NumberField source="id" />
			<TextField source="name" />
			<EditButton />
		</Datagrid>
	</List>
);
