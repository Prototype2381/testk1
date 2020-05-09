import React from 'react';
import {
    Show,ShowButton,SimpleShowLayout,DateField,List,Edit,Create,Datagrid,TextField,EditButton,DisabledInput,SimpleForm,TextInput,Filter,DeleteButton,BooleanField,BooleanInput
} from 'react-admin';

const ShopFilter = props => (
    <Filter {...props}>
        <TextInput label="검색" source="search" alwaysOn />
    </Filter>
);

export const ShopList = props => (
    <List title="상점 관리" filters={<ShopFilter />} exporter={false} {...props}>
        <Datagrid>
            <TextField source="category" label="분류" />
            <TextField source="name" label="상점 이름" />
            <TextField source="info" label="상점 소개"/>
            <TextField source="menu" label="메뉴 소개"/>
            <TextField source="tel" label="주소"/>
            <ShowButton />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);

const ShopTitle = ({ record }) => {
    return <span>Shop {record ? `"${record.title}"` : ''}</span>;
};

export const ShopEdit = props => (
    <Edit title={<ShopTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="category" label="분류" />
            <TextInput source="name" label="상점 이름" />
            <TextInput source="info" label="상점 소개"/>
            <TextInput source="menu" label="메뉴 소개"/>
            <TextInput source="tel" label="주소"/>
        </SimpleForm>
    </Edit>
);

export const ShopCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
        <TextInput source="category" label="분류" />
            <TextInput source="name" label="상점 이름" />
            <TextInput source="info" label="상점 소개"/>
            <TextInput source="menu" label="메뉴 소개"/>
            <TextInput source="tel" label="주소"/>
        </SimpleForm>
    </Create>
);

export const ShopShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
        <TextField source="category" label="분류" />
            <TextField source="name" label="상점 이름" />
            <TextField source="info" label="상점 소개"/>
            <TextField source="menu" label="메뉴 소개"/>
            <TextField source="tel" label="주소"/>
        </SimpleShowLayout>
    </Show>
);
