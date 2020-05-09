var Schema = {};

Schema.createSchema = function(mongoose) {

	// 스키마 정의
	var ShopScheman = mongoose.Schema({
	    name: {type: String, index: 'hashed', 'default':''},
	    category: {type: String, 'default':''},
		info: {type: String, 'default':''},
		menu: {type: String, 'default':''},
		tel: {type: String, 'default':''}
	});
	
	//스키마객체의 Index메소드를 이용해서 인덱스 만듬. 2dsphere는 구형태일 때
	//ShopScheman.index({geometry:'2dsphere'});

	// 스키마에 static 메소드 추가
	// 모든 헬프데스트 조회
	ShopScheman.static('findAll', function(callback) {
		return this.find({}, callback);
	});

	//헬프데스크 다큐멘트 하나 불러옴
	ShopScheman.static('FindOne_Schema', function(id,_callback) {	
		this.findOne({'_id': id},function(err,callbackdata){_callback(callbackdata);});
	});	

	//헬프데스크 다큐멘트 하나 수정
	ShopScheman.static('UpdateOne_Schema',function(id,name, category, info,menu,tel, _callback) {			
		console.log('스키마모델 안에 UpdateOne_Schema 호출됨');	
		var this2= this;

		this.updateOne({ _id: id  },{ $set: { name: name,category: category , info: info, menu:menu, tel:tel
		} },function(result){this2.findOne({'_id': id},function(err,callbackdata){_callback(callbackdata)})})
	});

	return ShopScheman;
}
// module.exports에 UserSchema 객체 직접 할당
module.exports = Schema;
