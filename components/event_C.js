import React from 'react';
import {
    Show,ShowButton,SimpleShowLayout,DateField,List,Edit,Create,Datagrid,TextField,EditButton,DisabledInput,SimpleForm,TextInput,Filter,DeleteButton,BooleanField,BooleanInput
} from 'react-admin';

const EventFilter = props => (
    <Filter {...props}>
        <TextInput label="검색" source="search" alwaysOn />
    </Filter>
);

export const EventList = props => (
    <List title="이벤트 관리" filters={<EventFilter />} exporter={false} {...props}>
        <Datagrid>
            <TextField source="title" label="제목" />
            <TextField source="contents" label="내용" />
            <ShowButton />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

const EventTitle = ({ record }) => {
    return <span>Event {record ? `"${record.title}"` : ''}</span>;
};

export const EventEdit = props => (
    <Edit title={<EventTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" label="제목" />
            <TextInput source="contents" label="내용" />
        </SimpleForm>
    </Edit>
);

export const EventCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
        <TextInput source="title" label="제목" />
        <TextInput source="contents" label="내용" />
        </SimpleForm>
    </Create>
);

export const EventShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" label="제목" />
            <TextField source="contents" label="내용" />
        </SimpleShowLayout>
    </Show>
);
