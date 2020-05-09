import React from 'react';
import {
    Show,ShowButton,SimpleShowLayout,DateField,List,Edit,Create,Datagrid,TextField,EditButton,DisabledInput,SimpleForm,TextInput,Filter,DeleteButton,BooleanField,BooleanInput
} from 'react-admin';

const MemberFilter = props => (
    <Filter {...props}>
        <TextInput label="검색" source="search" alwaysOn />
    </Filter>
);

export const MemberList = props => (
    <List title="회원 관리" filters={<MemberFilter />} exporter={false} {...props}>
        <Datagrid>
            <TextField source="idd" label="아이디" />
            <TextField source="name" label="회원 이름" />
            <TextField source="tel" label="전화번호"/>
            <TextField source="email" label="이메일"/>
            <ShowButton />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

const MemberTitle = ({ record }) => {
    return <span>Member {record ? `"${record.title}"` : ''}</span>;
};

export const MemberEdit = props => (
    <Edit title={<MemberTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="idd" label="아이디" />
            <TextInput source="name" label="회원 이름" />
            <TextInput source="tel" label="전화번호"/>
            <TextInput source="email" label="이메일"/>
        </SimpleForm>
    </Edit>
);

export const MemberCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
        <TextInput source="idd" label="아이디" />
            <TextInput source="name" label="회원 이름" />
            <TextInput source="tel" label="전화번호"/>
            <TextInput source="email" label="이메일"/>
        </SimpleForm>
    </Create>
);

export const MemberShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="idd" label="아이디" />
            <TextField source="name" label="회원 이름" />
            <TextField source="tel" label="전화번호"/>
            <TextField source="email" label="이메일"/>
        </SimpleShowLayout>
    </Show>
);
