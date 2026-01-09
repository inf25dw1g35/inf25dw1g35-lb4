import { List, Datagrid, TextField, NumberField, DateField, ReferenceField, EditButton, Edit, NumberInput, DateInput, SelectInput, ReferenceInput, SimpleForm, TextInput } from 'react-admin';

export const ActorEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="name" />
			<DateInput source="birthdate" />
			<TextInput source="country" />
		</SimpleForm>
	</Edit>
);


