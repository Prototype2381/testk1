// 헬프데스크 저장, 조회 및 공간 검색을 위한 라우팅 함수 정의

var GET_ONE = function(req, res) {
	console.log('shop_S 모듈 안에 있는 Get_One 호출됨.'); 

    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	var _id = req.params.id;

	database.ShopModel.FindOne_Schema(_id,function(results) {
		res.json(results);
		res.end();
	})
};

var UPDATE = function(req, res) {
	console.log('shop_S 모듈 안에 있는 UPDATE 호출됨.');
	
	var name = req.body.name;
	var category = req.body.category;
	var info = req.body.info;
	var menu = req.body.menu;
	var tel = req.body.tel;

	
    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	var _id = req.params.id;
	database.ShopModel.UpdateOne_Schema(_id,name,category,info,menu,tel,function(results) {
		console.log("UPDATE in shop_S");
		res.json(results);
		res.end();
	})
};

var CREATE = function(req, res) {
	console.log('shop_S 모듈 안에 있는 CREATE 호출됨.');
 
	var name = req.body.name;
	var category = req.body.category;
	var info = req.body.info;
	var menu = req.body.menu;
	var tel = req.body.tel;


	// 데이터베이스 객체 참조
	
	var database = req.app.get('database');

	var shopdata = 
	{name:name, category:category , info:info,menu:menu,tel:tel};

	var shop_ins = new database.ShopModel(shopdata);

	shop_ins.save(function(err,result) {
		console.log("헬프데스크 데이터 추가함.");
		res.json(shop_ins);
		res.end();
	});
};

var DELETE = function(req, res) {
	console.log('shop_S 모듈 안에 있는 Get_One 호출됨.'); 

    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	var id = req.params.id;

	database.ShopModel.remove({ _id: id  },function(result){
		console.log("헬프데스크 데이터 삭제함.");
		console.log(result);
		res.json(req.params);
		res.end();
	});
};

var GET_LIST = function(req, res) {
	console.log('shop_S 모듈 안에 있는 GET_LIST 호출됨.');
	var database = req.app.get('database');
	var filter = req.body.filter || req.query.filter;

	var pagination = req.body.pagination || req.query.pagination;
	var pagination_ob = JSON.parse(pagination);
	var pageIndex = String(pagination_ob[0]);
	var perPage = String(pagination_ob[1]);

	var pageSort = req.body.sort || req.query.sort;
	var pageSort_ob = JSON.parse(pageSort);
	if(pageSort_ob[1]=='DESC'){
		name='-'+pageSort_ob[0];
	}
	else{
		name=pageSort_ob[0];
	}

	var paging = function (bbs, pageIndex, pageUnit) {
		var length = bbs.length;

		if (pageIndex == '' && pageUnit == ''){
			return bbs;
		}
		else{
			if ((pageIndex-1) > parseInt(length / pageUnit)) {
				console.log("error no such page index " + pageIndex + "<=" + length + "/" + pageUnit);
				return null;
			}
			var startIndex = (pageIndex-1) * pageUnit;
			var endIndex = pageIndex * pageUnit;
			var data = [];

			for (var i = startIndex; i < endIndex; i++) {
				if(bbs[i])
				{
					data.push(bbs[i]);
				}
			}
			var jdata = JSON.stringify(data);
			var colection = 'shop ';
			var res_string = colection + startIndex + '-' + (endIndex-1) + '/'+ length;

			res.writeHead('200', {'Content-Range':res_string}); //이 밑 3줄은 세트임. https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
			res.write(jdata);
			res.end();
		}
	}	

	if(filter === "{}"){
		database.ShopModel.findAll().sort(name).exec(
			function(err, results){
				paging(results,pageIndex, perPage);
			}
		);
	}
	else{
		database.ShopModel.find({name:JSON.parse(filter).search}).sort(name).exec(
			function(err, results){
				paging(results,pageIndex, perPage);
		});
	}
};

module.exports.GET_ONE = GET_ONE;
module.exports.UPDATE = UPDATE;
module.exports.CREATE = CREATE;
module.exports.DELETE = DELETE;
module.exports.GET_LIST = GET_LIST;

