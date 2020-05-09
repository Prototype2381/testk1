import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';

import Dashboard from './dashboard_c';
import authProvider from './authProvider';
import {ShopList,ShopEdit,ShopCreate,ShopShow} from './shop_C';
import {MemberList,MemberEdit,MemberCreate,MemberShow} from './member_C';
import {EventList,EventEdit,EventCreate,EventShow} from './event_C';
import {AnnounceList,AnnounceEdit,AnnounceCreate,AnnounceShow} from './announce_C';
import ShopIcon from '@material-ui/icons/Book';
import ServerProvider from './dataProvider';
//const dataProvider = ServerProvider('http://r114-env.eba-ighjf3sx.ap-northeast-2.elasticbeanstalk.com');
const dataProvider = ServerProvider('http://localhost:3000');

const App = () => (
    <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        dashboard={Dashboard}>
        <Resource
            name="Shop" // API앤드포인트임. url에서 API로 쓰임
            icon={ShopIcon}
            list={ShopList}
            edit={ShopEdit}
            create={ShopCreate}
            show={ShopShow}
        />
        <Resource
            name="member" // API앤드포인트임. url에서 API로 쓰임
            icon={ShopIcon}
            list={MemberList}
            edit={MemberEdit}
            create={MemberCreate}
            show={MemberShow}
        />
        <Resource
            name="event" // API앤드포인트임. url에서 API로 쓰임
            icon={ShopIcon}
            list={EventList}
            edit={EventEdit}
            create={EventCreate}
            show={EventShow}
        />
        <Resource
            name="announce" // API앤드포인트임. url에서 API로 쓰임
            icon={ShopIcon}
            list={AnnounceList}
            edit={AnnounceEdit}
            create={AnnounceCreate}
            show={AnnounceShow}
        />
    </Admin>
);
export default App;
