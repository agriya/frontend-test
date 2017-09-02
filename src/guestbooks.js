import React from 'react';
import { Create, SimpleForm, TextInput, List, Datagrid, TextField } from 'admin-on-rest';
import RichTextInput from 'aor-rich-text-input';

export const GuestbookList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="user" />
            <TextField source="phone" />
            <TextField source="message" />
        </Datagrid>
    </List>
);

export const GuestbookCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="phone" />
            <RichTextInput source="message" />
        </SimpleForm>
    </Create>
);