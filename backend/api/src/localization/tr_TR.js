export default {
	Global: {
		hoopMessage: 'Eyvah! Bir şeyler ters gitti!',
		expiredMessage: 'Bağlantı süreniz dolmuştur',
		transactionSuccessfull: 'İşlem başarılı.',
		dataNotFound: 'Veri bulunamadı.',
		unauthorized: 'Bu işlemi yapmak için yetkiniz yok.'
	},
	Auth: {
		success: {
			login: 'Başarıyla giriş yapıldı'
		},
		error: {
			wrongEmail: 'Hatalı email veya şifre',
			tokenNotFound: 'Giriş yapmalısınız',
			unauthorizedLogin: 'Bu işlemi yapmak için yetkiniz yok.'
		}
	},
	Users: {
		success: {
			create: 'Kullanıcı başarıyla oluşturuldu.',
			update: 'Kullanıcı başarıyla güncellendi.',
			delete: 'Kullanıcı başarıyla silindi.'
		},
		error: {
			create: 'Kullanıcı oluşturulurken bir hata meydana geldi.',
			update: 'Kullanıcı güncellenirken bir hata meydana geldi.',
			delete: 'Kullanıcı silinirken bir hata meydana geldi.'
		},
		info: {
			notFound: 'Kullanıcı bulunamadı.',
			get: 'Kullanıcı başarıyla getirildi.',
			gets: 'Kullanıcılar başarıyla getirildi.',
			alreadyExist: 'Bu e-posta adresi ile daha önce kayıt yapılmış.'
		}
	},
	UserCards: {
		success: {
			create: 'Kart başarıyla oluşturuldu.',
			update: 'Kart başarıyla güncellendi.',
			delete: 'Kart başarıyla silindi.'
		},
		error: {
			create: 'Kart oluşturulurken bir hata meydana geldi.',
			update: 'Kart güncellenirken bir hata meydana geldi.',
			delete: 'Kart silinirken bir hata meydana geldi.'
		},
		info: {
			notFound: 'Kart bulunamadı.',
			get: 'Kart başarıyla getirildi.',
			gets: 'Kartlar başarıyla getirildi.',
			alreadyExist: 'Bu e-posta adresi ile daha önce kayıt yapılmış.'
		}
	},
	Outgoings: {
		success: {
			create: 'Borç başarıyla oluşturuldu.',
			update: 'Borç başarıyla güncellendi.',
			delete: 'Borç başarıyla silindi.'
		},
		error: {
			create: 'Borç oluşturulurken bir hata meydana geldi.',
			update: 'Borç güncellenirken bir hata meydana geldi.',
			delete: 'Borç silinirken bir hata meydana geldi.'
		},
		info: {
			notFound: 'Borç bulunamadı.',
			get: 'Borç başarıyla getirildi.',
			gets: 'Borçlar başarıyla getirildi.',
			alreadyExist: 'Bu e-posta adresi ile daha önce kayıt yapılmış.'
		}
	},
	Installments: {
		success: {
			create: 'Taksit başarıyla oluşturuldu.',
			update: 'Taksit başarıyla güncellendi.',
			delete: 'Taksit başarıyla silindi.',
			paid: 'Taksit başarıyla ödendi.'
		},
		error: {
			create: 'Taksit oluşturulurken bir hata meydana geldi.',
			update: 'Taksit güncellenirken bir hata meydana geldi.',
			delete: 'Taksit silinirken bir hata meydana geldi.'
		},
		info: {
			notFound: 'Taksit bulunamadı.',
			get: 'Taksit başarıyla getirildi.',
			gets: 'Taksitler başarıyla getirildi.',
			alreadyExist: 'Bu e-posta adresi ile daha önce kayıt yapılmış.'
		}
	},
	Joi: {
		'any.required': '{{#label}} gerekli',
		'array.base': '{{#label}} bir dizi olmalı',
		'array.length': '{{#label}} {{#limit}} eleman içermeli',
		'array.max': '{{#label}} {{#limit}} az ya da eşit olmalı',
		'array.min': '{{#label}} en az {{#limit}} eleman içermeli',
		'boolean.base': '{{#label}} boolean olmalı',
		'date.base': '{{#label}} bir tarih olmalı',
		'number.base': '{{#label}} sayı olmalı',
		'number.integer': '{{#label}} bir tam sayı olmalı',
		'number.max': '{{#label}} {{#limit}} az ya da eşit olmalı',
		'number.min': '{{#label}} {{#limit}} büyük ya da eşit olmalı',
		'number.negative': '{{#label}} negatif olmalı',
		'number.positive': '{{#label}} pozitif olmalı',
		'number.greater': '{{#label}} değeri {{#root}} değerinden daha büyük olmalı',
		'object.base': '{{#label}} nesne (object) olmalı',
		'object.unknown': '{{#label}} geçerli girdi olmalı.',
		'string.alphanum': '{{#label}} sadece alfa-nümerik karakterler içermeli',
		'string.base': '{{#label}} bir dize olmalı',
		'string.base64': '{{#label}} geçerli bir base64 dizesi olmalı',
		'string.creditCard': '{{#label}} bir kredi kartı olmalı',
		'string.dataUri': '{{#label}} geçerli bir dataUri dizesi olmalı',
		'string.domain': '{{#label}} geçerli bir alan adı olmalı',
		'string.email': '{{#label}} geçerli bir e-mail olmalı',
		'string.empty': '{{#label}} boş bırakılamaz',
		'string.guid': '{{#label}} geçerli bir GUID olmalı',
		'string.hex': '{{#label}} sadece onaltılık (hexadecimal) karakterler içerebilir',
		'string.hexAlign': '{{#label}} onaltılık (hex) kodu çözülmüş açıklamalar byte\'larla hizalı olmalı',
		'string.hostname': '{{#label}} geçerli bir sunucu ismi olmalı',
		'string.ip': '{{#label}} geçerli bir IP adresi olmalı',
		'string.isoDate': '{{#label}} ISO formatında olmalı',
		'string.isoDuration': '{{#label}} geçerli bir ISO 8601 süresi (duration) olmalı',
		'string.length': '{{#label}} {{#limit}} karakterden oluşmalı',
		'string.lowercase': '{{#label}} sadece küçük harfler içerebilir',
		'string.max': '{{#label}} {{#limit}} az ya da eşit olmalı',
		'string.min': '{{#label}} en az {{#limit}} karakter olmalı',
		'string.normalize': '{{#label}} {{#form}} formunda normalleştirilmiş unicode olmalı',
		'string.token': '{{#label}} sadece alfa-nümerik ve alt çizgili (underscore) karakterler içerebilir',
		'string.pattern.base': '{{#label}} {:[.]} değeriyle gereken düzene uymuyor: {{#regex}}',
		'string.trim': '{{#label}} başında ve sonunda boşluk olmamalı',
		'string.uri': '{{#label}} geçerli bir url olmalı',
		'string.uriRelativeOnly': '{{#label}} geçerli bir relative url olmalı',
		'string.uppercase': '{{#label}} sadece büyük harfler içermeli'
	}
};