module.exports = {
	server_port: 3000,
	db_url: 'mongodb+srv://moon:digitalx123@cluster0-tpvdz.mongodb.net/test?retryWrites=true&w=majority',
	db_schemas: [
		{file:'./announce_D', collection:'announce', schemaName:'AnnounceSchema', modelName:'AnnounceModel'}
		,{file:'./event_D', collection:'event', schemaName:'EventSchema', modelName:'EventModel'}
		,{file:'./member_D', collection:'member', schemaName:'MemberSchema', modelName:'MemberModel'}
		,{file:'./shop_D', collection:'shop', schemaName:'ShopSchema', modelName:'ShopModel'}
	],
	route_info: [
		{file:'./announce_S',path:'/announce', function:'GET_LIST', type:'GET'}
		,{file:'./announce_S',path:'/announce/:id', function:'GET_ONE', type:'GET'}
		,{file:'./announce_S',path:'/announce/:id', function:'UPDATE', type:'PUT'}
		,{file:'./announce_S',path:'/announce', function:'CREATE', type:'POST'}
		,{file:'./announce_S',path:'/announce/:id', function:'DELETE', type:'DELETE'}
		,{file:'./event_S',path:'/event', function:'GET_LIST', type:'GET'}
		,{file:'./event_S',path:'/event/:id', function:'GET_ONE', type:'GET'}
		,{file:'./event_S',path:'/event/:id', function:'UPDATE', type:'PUT'}
		,{file:'./event_S',path:'/event', function:'CREATE', type:'POST'}
		,{file:'./event_S',path:'/event/:id', function:'DELETE', type:'DELETE'}
		,{file:'./member_S',path:'/member', function:'GET_LIST', type:'GET'}
		,{file:'./member_S',path:'/member/:id', function:'GET_ONE', type:'GET'}
		,{file:'./member_S',path:'/member/:id', function:'UPDATE', type:'PUT'}
		,{file:'./member_S',path:'/member', function:'CREATE', type:'POST'}
		,{file:'./member_S',path:'/member/:id', function:'DELETE', type:'DELETE'}
		,{file:'./shop_S',path:'/shop', function:'GET_LIST', type:'GET'}
		,{file:'./shop_S',path:'/shop/:id', function:'GET_ONE', type:'GET'}
		,{file:'./shop_S',path:'/shop/:id', function:'UPDATE', type:'PUT'}
		,{file:'./shop_S',path:'/shop', function:'CREATE', type:'POST'}
		,{file:'./shop_S',path:'/shop/:id', function:'DELETE', type:'DELETE'}
	]
}