import { List, Datagrid, TextField, NumberField, DateField, ReferenceField, EditButton, Edit, NumberInput, DateInput, SelectInput, ReferenceInput, SimpleForm, TextInput, SelectArrayInput } from 'react-admin';

export const FilmEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput source="title" />
			<NumberInput source="year" />
			<ReferenceInput source="directorsId" reference="directors" />
			<ReferenceInput source="genresId" reference="genres" />


		</SimpleForm>
	</Edit>
);
