import { Create, SimpleForm, TextInput, NumberInput, ReferenceInput } from 'react-admin';

const FilmCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput source="title" />
				<NumberInput source="year" />
				<ReferenceInput source="directorsId" reference="directors" />
				<ReferenceInput source="genresId" reference="genres" />
			</SimpleForm>
		</Create>
	);
}
export default FilmCreate;
