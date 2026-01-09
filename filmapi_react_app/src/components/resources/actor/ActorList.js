import { Datagrid, NumberField, TextField, DateField, EditButton, List } from 'react-admin';

export const ActorList = () => (
	<List>
		<Datagrid rowClick="show">
			<NumberField source="id" />
			<TextField source="name" />
			<DateField source="birthdate" />
			<TextField source="country" />
			<EditButton />
		</Datagrid>
	</List>
);
