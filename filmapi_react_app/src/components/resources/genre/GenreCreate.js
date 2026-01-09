import { Create, SimpleForm, TextInput, DateInput } from 'react-admin';

const GenreCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput source="name" />
			</SimpleForm>
		</Create>
	);
}

export default GenreCreate;
