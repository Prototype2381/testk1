import React from 'react';
import {
    Show,ShowButton,SimpleShowLayout,DateField,List,Edit,Create,Datagrid,TextField,EditButton,DisabledInput,SimpleForm,TextInput,Filter,DeleteButton,ImageInput,ImageField
} from 'react-admin';

const AnnounceFilter = props => (
    <Filter {...props}>
        <TextInput label="검색" source="search" alwaysOn />
    </Filter>
);

export const AnnounceList = props => (
    <List title="공지사항 관리" filters={<AnnounceFilter />} exporter={false} {...props}>
        <Datagrid>
            <TextField source="title" label="제목" />
            <TextField source="contents" label="내용" />
            <ShowButton />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

const AnnounceTitle = ({ record }) => {
    return <span>Announce {record ? `"${record.title}"` : ''}</span>;
};

export const AnnounceEdit = props => (
    <Edit title={<AnnounceTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" label="제목" />
            <TextInput source="contents" label="내용" />
            <ImageInput multiple source="pictures" accept="image/*">
                    <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const AnnounceCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
        <TextInput source="title" label="제목" />
        <TextInput source="contents" label="내용" />
        </SimpleForm>
    </Create>
);

export const AnnounceShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" label="제목" />
            <TextField source="contents" label="내용" />
        </SimpleShowLayout>
    </Show>
);
