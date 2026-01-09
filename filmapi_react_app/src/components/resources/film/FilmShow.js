import { Show, SimpleShowLayout, TextField, NumberField, ReferenceField, ReferenceManyField, Datagrid, DateField } from 'react-admin';

export const FilmShow = () => (
	<Show>
		<SimpleShowLayout>
			<TextField source="title" />
			<NumberField source="year" />

			<ReferenceField label="Director" source="directorsId" reference="directors" />
			<ReferenceField label="Genre" source="genresId" reference="genres" />

			<ReferenceManyField label="Actors" reference="actors" target="filmsId">
				<Datagrid>
					<TextField source="name" />
					<DateField source="birthdate" />
					<TextField source="country" />
				</Datagrid>
			</ReferenceManyField>


		</SimpleShowLayout>
	</Show>
);
