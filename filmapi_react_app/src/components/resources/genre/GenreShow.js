import { Show, SimpleShowLayout, TextField, NumberField, ReferenceField, ReferenceManyField, Datagrid, DateField } from 'react-admin';

export const GenreShow = () => (
	<Show>
		<SimpleShowLayout>
			<TextField source="name" />

			<ReferenceManyField label="Films" reference="films" target="genresId">
				<Datagrid>
					<TextField source="title" />
					<NumberField source="year" />
					<ReferenceField source="directorsId" reference="directors" />
				</Datagrid>
			</ReferenceManyField>

		</SimpleShowLayout>
	</Show>
);
