import { Create, SimpleForm, TextInput, DateInput } from 'react-admin';

const ActorCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput source="name" />
				<DateInput source="birthdate" />
				<TextInput source="country" />
			</SimpleForm>
		</Create>
	);
}

export default ActorCreate;
