import { Show, SimpleShowLayout, TextField, NumberField, ReferenceField, ReferenceManyField, Datagrid, DateField } from 'react-admin';

export const ActorShow = () => (
	<Show>
		<SimpleShowLayout>
			<TextField source="name" />
			<DateField source="birthdate" />
			<TextField source="country" />

			<ReferenceManyField label="Films" reference="films" target="actorsId">
				<Datagrid>
					<TextField source="title" />
					<NumberField source="year" />
					<ReferenceField source="directorsId" reference="directors" />
					<ReferenceField source="genresId" reference="genres" />
				</Datagrid>
			</ReferenceManyField>

		</SimpleShowLayout>
	</Show>
);
