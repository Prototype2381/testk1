// 헬프데스크 저장, 조회 및 공간 검색을 위한 라우팅 함수 정의
testete
var GET_ONE = function(req, res) {
	console.log('Announce_S 모듈 안에 있는 Get_One 호출됨.'); 

    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	var _id = req.params.id;

	database.AnnounceModel.FindOne_Schema(_id,function(results) {
		res.json(results);
		res.end();
	})
};

var UPDATE = function(req, res) {
	console.log('Announce_S 모듈 안에 있는 UPDATE 호출됨.');
	
    var paramTitle = req.body.title || req.query.title;
    var paramContents = req.body.contents || req.query.contents;

    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	var _id = req.params.id;
	database.AnnounceModel.UpdateOne_Schema(_id,paramTitle,paramContents,function(results) {
		console.log("UPDATE in Announce_S");
		res.json(results);
		res.end();
	})
};

var CREATE = function(req, res) {
	console.log('Announce_S 모듈 안에 있는 CREATE 호출됨.');
 
    var title = req.body.title || req.query.title;
    var contents = req.body.contents || req.query.contents;

    // 데이터베이스 객체 참조
	var database = req.app.get('database');

	var announcedata = 
	{title:title, contents:contents
	};

	var announce_ins = new database.AnnounceModel(announcedata);

	announce_ins.save(function(err,result) {
		console.log("헬프데스크 데이터 추가함.");
		res.json(announce_ins);
		res.end();
	});
};

var DELETE = function(req, res) {
	console.log('Announce_S 모듈 안에 있는 Get_One 호출됨.'); 

    // 데이터베이스 객체 참조
	var database = req.app.get('database');
	var id = req.params.id;

	database.AnnounceModel.remove({ _id: id  },function(result){
		console.log("헬프데스크 데이터 삭제함.");
		console.log(result);
		res.json(req.params);
		res.end();
	});
};

var GET_LIST = function(req, res) {
	console.log('Announce_S 모듈 안에 있는 GET_LIST 호출됨.');
	var database = req.app.get('database');
	var filter = req.body.filter || req.query.filter;

	var pagination = req.body.pagination || req.query.pagination;
	var pagination_ob = JSON.parse(pagination);
	var pageIndex = String(pagination_ob[0]);
	var perPage = String(pagination_ob[1]);

	var pageSort = req.body.sort || req.query.sort;
	var pageSort_ob = JSON.parse(pageSort);
	if(pageSort_ob[1]=='DESC'){
		title='-'+pageSort_ob[0];
	}
	else{
		title=pageSort_ob[0];
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
			var colection = 'announce ';
			var res_string = colection + startIndex + '-' + (endIndex-1) + '/'+ length;
			
			res.writeHead('200', {'Content-Range':res_string}); //이 밑 3줄은 세트임. https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
			res.write(jdata);
			res.end();
		}
	}	

	if(filter === "{}"){
		database.AnnounceModel.findAll().sort(title).exec(
			function(err, results){
				paging(results,pageIndex, perPage);
			}
		);
	}
	else{
		database.AnnounceModel.find({title:JSON.parse(filter).search}).sort(title).exec(
			function(err, results){
				paging(results,pageIndex, perPage);
		});
	}
};

var GET_ANNOUNCELIST = function(req, res) {
	console.log('Announce_S 모듈 안에 있는 GET_LIST 호출됨.');
	var database = req.app.get('database');
	database.AnnounceModel.findAll().sort({updated_at:-1}).exec(
		function(err, results){
			res.json(results);
		}
	);
};

var POST_ANNOUNCE = function(req, res) {
	console.log('Announce_S 모듈 안에 있는 POST_ANNOUNCE 호출됨.');
 
    var title = req.body.title;
	var contents = req.body.contents;

    // 데이터베이스 객체 참조
	var database = req.app.get('database');

	var announcedata = 
	{title:title, contents:contents};

	var announce_ins = new database.AnnounceModel(announcedata);

	announce_ins.save(function(err,result) {
		console.log("POST_ANNOUNCE");
		res.json({successpost:true});
		res.end();
	});
};

module.exports.GET_ONE = GET_ONE;
module.exports.UPDATE = UPDATE;
module.exports.CREATE = CREATE;
module.exports.DELETE = DELETE;
module.exports.GET_LIST = GET_LIST;
module.exports.GET_ANNOUNCELIST = GET_ANNOUNCELIST;
module.exports.POST_ANNOUNCE = POST_ANNOUNCE;