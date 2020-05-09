// 헬프데스크 저장, 조회 및 공간 검색을 위한 라우팅 함수 정의
var GET_ONE = function(req, res) {
	console.log('member_S 모듈 안에 있는 Get_One 호출됨.'); 

    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	var _id = req.params.id;

	database.MemberModel.FindOne_Schema(_id,function(results) {
		res.json(results);
		res.end();
	})
};

var UPDATE = function(req, res) {
	console.log('member_S 모듈 안에 있는 UPDATE 호출됨.');
	
	var idd = req.body.idd;
	var name = req.body.name;
	var tel = req.body.tel;
	var email = req.body.email;

	
    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	var _id = req.params.id;
	database.MemberModel.UpdateOne_Schema(_id,idd,name,tel,email,function(results) {
		console.log("UPDATE in member_S");
		res.json(results);
		res.end();
	})
};

var CREATE = function(req, res) {
	console.log('member_S 모듈 안에 있는 CREATE 호출됨.');
 
	var idd = req.body.idd || req.query.idd;
	var name = req.body.name || req.query.name;
	var tel = req.body.tel || req.query.tel;
	var email = req.body.email || req.query.email;

    // 데이터베이스 객체 참조
	var database = req.app.get('database');

	var memberdata = 
	{idd:idd, name:name , tel:tel,email:email};

	var member_ins = new database.MemberModel(memberdata);

	member_ins.save(function(err,result) {
		console.log("헬프데스크 데이터 추가함.");
		res.json(member_ins);
		res.end();
	});
};

var DELETE = function(req, res) {
	console.log('member_S 모듈 안에 있는 Get_One 호출됨.'); 

    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	var id = req.params.id;

	database.MemberModel.remove({ _id: id  },function(result){
		console.log("헬프데스크 데이터 삭제함.");
		console.log(result);
		res.json(req.params);
		res.end();
	});
};

var GET_LIST = function(req, res) {
	console.log('member_S 모듈 안에 있는 GET_LIST 호출됨.');
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
			var colection = 'member ';
			var res_string = colection + startIndex + '-' + (endIndex-1) + '/'+ length;

			res.writeHead('200', {'Content-Range':res_string}); //이 밑 3줄은 세트임. https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
			res.write(jdata);
			res.end();
		}
	}	

	if(filter === "{}"){
		database.MemberModel.findAll().sort(name).exec(
			function(err, results){
				paging(results,pageIndex, perPage);
			}
		);
	}
	else{
		database.MemberModel.find({name:JSON.parse(filter).search}).sort(name).exec(
			function(err, results){
				paging(results,pageIndex, perPage);
		});
	}
};

var CALL_TRANSLATION = function(req, res) {
	console.log('member_S 모듈 안에 있는 CALL_TRANSLATION 호출됨.');
  
	var maxDistance = 1000000000;
	
	var idd = req.body.idd || req.query.idd;
    var name = req.body.name || req.query.name;
	var tel = req.body.tel || req.query.tel;
	var email = req.body.email || req.query.email;

    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		database.MemberModel.Call_Translation_Schema(paramCountry.trim(),idd, name, tel,email, function(err, results) {
			res.json(results[0].tel);
		});
	} 	
};

var CALL_VISITING = function(req, res) {
	console.log('member_S 모듈 안에 있는 CALL_VISITING 호출됨.');
  
	var maxDistance = 1000000000;
	
	var idd = req.body.idd || req.query.idd;
    var tel = req.body.tel || req.query.tel;
    var name = req.body.name || req.query.name;
	var email = req.body.email || req.query.email;
	
	var database = req.app.get('database');
	
    // 데이터베이스 객체가 초기화된 경우
	if (database.db) {
		database.MemberModel.Call_Visiting_Schema(paramCountry.trim(),idd, tel, name,email, function(err, results) {
			res.json(results[0].tel);
		});
	} 	
};

var GET_MEMBERLIST = function(req, res) {
	console.log('member_S 모듈 안에 있는 GET_MEMBERLIST 호출됨.');
	var database = req.app.get('database');
	database.MemberModel.findAll().exec(
		function(err, results){
			res.json(results);
		}
	);
};

//module.exports.list = list;
module.exports.GET_ONE = GET_ONE;
module.exports.UPDATE = UPDATE;
module.exports.CREATE = CREATE;
module.exports.DELETE = DELETE;
module.exports.GET_LIST = GET_LIST;
module.exports.GET_MEMBERLIST = GET_MEMBERLIST;

