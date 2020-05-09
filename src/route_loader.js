/**
 * 라우팅 모듈을 로딩하여 설정
 * 
 * 라우팅 모듈 파일에 대한 정보는 config.js의 route_info 배열에 등록함
 *
 * @date 2016-11-10
 * @author Mike
 */

var route_loader = {};

var config = require('../database/config');

route_loader.init = function(app, router) {
	console.log('route_loader.init 호출됨.');
	return initRoutes(app, router);
};

// route_info에 정의된 라우팅 정보 처리
function initRoutes(app, router) {
	var infoLen = config.route_info.length;
 
	for (var i = 0; i < infoLen; i++) {
		var curItem = config.route_info[i];
		console.log('%s 파일에서 모듈정보를 읽어옴.', curItem.file);
		// 모듈 파일에서 모듈 불러옴	
		var curModule = require(curItem.file);
		//  라우팅 처리
		if (curItem.type == 'GET') {
            router.route(curItem.path).get(curModule[curItem.function]);
		} else if (curItem.type == 'POST') {
            router.route(curItem.path).post(curModule[curItem.function]);
		} else if (curItem.type == 'PUT') {
			router.route(curItem.path).put(curModule[curItem.function]);
		}else if (curItem.type == 'DELETE') {
			router.route(curItem.path).delete(curModule[curItem.function]);
		}	else {
			router.route(curItem.path).post(curModule[curItem.function]);
		}	
		
		console.log('라우팅 모듈 [%s]이(가) 설정됨.', curItem.function);
	}

    // 라우터 객체 등록
    app.use('/', router);
}

module.exports = route_loader;

