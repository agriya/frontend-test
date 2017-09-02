import React from 'react';
import { Show, SimpleShowLayout, List, Datagrid, TextField, RichTextField, DateField } from 'admin-on-rest';

export const StateList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="abbreviation" />
            <TextField source="capital" />
            <TextField source="most-populous-city" />
            <TextField source="population" />
            <TextField source="square-miles" />
            <TextField source="time-zone-1" />
            <TextField source="time-zone-2" />
            <TextField source="dst" />
        </Datagrid>
    </List>
);

export const StateShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="teaser" />
            <RichTextField source="body" />
            <DateField label="Publication date" source="created_at" />
        </SimpleShowLayout>
    </Show>
);