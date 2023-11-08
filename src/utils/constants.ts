export const NOT_AVAILABLE_TEXT = '--';

export const SI = [
  { value: 1, symbol: '' },
  { value: 1e3, symbol: 'K' },
  { value: 1e6, symbol: 'M' },
  { value: 1e9, symbol: 'B' },
  { value: 1e12, symbol: 't' },
  { value: 1e15, symbol: 'q' },
  { value: 1e18, symbol: 'Q' },
  { value: 1e21, symbol: 's' },
  { value: 1e24, symbol: 'S' },
  { value: 1e27, symbol: 'o' },
  { value: 1e30, symbol: 'n' },
  { value: 1e33, symbol: 'd' },
  { value: 1e36, symbol: 'U' },
  { value: 1e39, symbol: 'D' },
  { value: 1e42, symbol: 'T' },
  { value: 1e45, symbol: 'Qt' },
  { value: 1e48, symbol: 'Qd' },
  { value: 1e51, symbol: 'Sd' },
  { value: 1e54, symbol: 'St' },
  { value: 1e57, symbol: 'O' },
  { value: 1e60, symbol: 'N' },
  { value: 1e63, symbol: 'v' },
  { value: 1e66, symbol: 'c' },
];

export const MOCK_USER_MANAGEMENT = [
  {
    userID: 123456,
    address: '0x1A2B3Cahsdkj8734878X9Y',
    totalOrder: 20,
    totalTradingVolume: '1233979',
    balance: '34563979',
    timestamp: 1697151091000,
  },
  {
    userID: 123456,
    address: '0x1A2B3Cahsdkj8734878X9Y',
    totalOrder: 20,
    totalTradingVolume: '1233979',
    balance: '34563979',
    timestamp: 1697151091000,
  },
  {
    userID: 123456,
    address: '0x1A2B3Cahsdkj8734878X9Y',
    totalOrder: 20,
    totalTradingVolume: '1233979',
    balance: '34563979',
    timestamp: 1697151091000,
  },
  {
    userID: 123456,
    address: '0x1A2B3Cahsdkj8734878X9Y',
    totalOrder: 20,
    totalTradingVolume: '1233979',
    balance: '34563979',
    timestamp: 1697151091000,
  },
];

export const MOCK_Statistical_BOX = [
  {
    title: 'Total users',
    value: '123,456',
  },
  {
    title: 'Total active users',
    value: '36,789',
  },
  {
    title: 'Total inactive users',
    value: '86,667',
  },
  {
    title: 'Daily active users',
    value: '1,234',
  },
  {
    title: 'New users today',
    value: '1,234',
  },
];

export const MOCK_MAKETING = [
  {
    type: 'Notification',
    title: 'KIKI just launched test',
    fromTime: 1697151091000,
    toTime: 1697151091000,
    status: 'Scheduled',
  },
  {
    type: 'Push Notification',
    title: 'KIKI just launched test',
    fromTime: 1697151091000,
    toTime: 1697151091000,
    status: 'Published',
  },
  {
    type: 'Notification',
    title: 'KIKI just launched',
    fromTime: 1697151091000,
    toTime: 1697151091000,
    status: 'Scheduled',
  },
];

export const MOCK_MEDICAL_LIST = [
  {
    medicineID: '1223',
    name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
    quality: 20,
    visit: '10/20',
    timestamp: 1697151091000,
    price: 120000,
  },
  {
    medicineID: '12234',
    name: 'Thuốc đau lưng',
    quality: 20,
    visit: '10/20',
    timestamp: 1697151091000,
    price: 12000000,
  },
  {
    medicineID: '1223',
    name: 'Thuốc đau tai',
    quality: 20,
    visit: '10/20',
    timestamp: 1697151091000,
    price: 170000,
  },
];

export const MOCK_CATEGORY_MEDICINE = [
  {
    categoryID: '1223',
    name: 'Hệ tim mạch & tạo máu',
    quality: 20,
  },
  {
    categoryID: '1223',
    name: 'Thuốc kháng sinh',
    quality: 20,
  },
  {
    categoryID: '1223',
    name: 'Thuốc chống ung thư',
    quality: 20,
  },
  {
    categoryID: '1223',
    name: 'Hệ thần kinh trung ương',
    quality: 20,
  },
  {
    categoryID: '1223',
    name: 'Hệ tiêu hóa & gan mật',
    quality: 20,
  },
];

export const MOCK_DATA_USER = [
  {
    id: 1,
    email: 'dohuycg12345@gmail.com',
    firstName: 'Huy',
    lastName: 'Đỗ',
    role: 'user',
    brandID: 1,
    phone: '0363043454',
    status: 'block',
  },
  {
    id: 2,
    email: 'huydo8x@gmail.com',
    firstName: 'Nguyen',
    lastName: 'Tan',
    role: 'admin',
    brandID: 1,
    phone: '0978654321',
    status: 'unlock',
  },
  {
    id: 3,
    email: 'huydonhang@gmail.com',
    firstName: 'Don',
    lastName: 'Hang',
    role: 'staff',
    brandID: 1,
    phone: '0987654321',
    status: 'unlock',
  },
];

export const MOCK_SUPPELIER = [
  {
    supplierID: '1234',
    supplierName: 'Công ty cổ phần dược phẩm Hà Nội',
    supplierEmail: 'a@gmail.com',
    supplierPhone: '0987654321',
  },
  {
    supplierID: '1234',
    supplierName: 'Công ty cổ phần dược phẩm Hà Đông',
    supplierEmail: 'ab@gmail.com',
    supplierPhone: '0987652321',
  },
];
export const MOCK_MEDICAL_PRODUCT_LIST = [
  {
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09985_6ae3f52230.jpg',
    medicineID: '1223',
    name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
    brand: 'Jpanwell',
    quality: 20,
    price: 120000,
    detail: {
      unit: 'Hộp',
      category: 'Cơ xương khớp',
      dosageForms: 'Viên nang cứng',
      specifications: 'Hộp 120 Viên',
      manufacturingCountry: 'Nhật Bản',
      Producer: 'Have fun Factory Co., Ltd',
      ingredient:
        'Canxi từ vỏ sò, Chất xơ hòa tan, Vi khuẩn acid lactic, Magie, Sắt, Vitamin B2, Vitamin B1, Vitamin D3, Vitamin K2',
      shortDescription:
        'Calcium Premium bổ sung canxi, một số các vitamin (vitamin B1, vitamin B2, vitamin D3, vitamin K2) và khoáng chất (magie, sắt) cho cơ thể; giúp tăng khả năng hấp thụ canxi; hỗ trợ giảm nguy cơ loãng xương.',
    },
  },
  {
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/373x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09754_782bfebbbf.jpg',
    medicineID: '173',
    name: 'Dầu Húng Chanh Lábebé hỗ trợ lợi phế trừ đờm, giảm ho (30ml)',
    brand: 'LÁBEBÉ',
    quality: 20,
    price: 144000,
    detail: {
      unit: 'Hộp',
      category: 'Tinh dầu các loại',
      manufacturingCountry: 'Việt Nam',
      Producer: 'Have fun Factory Co., Ltd',
      shortDescription:
        'Dầu Húng Chanh Lábebé hỗ trợ lợi phế trừ đờm, giảm ho. Thành phần chứa các thảo dược thiên nhiên an toàn và lành tính với người dùng như húng chanh, quả cơm cháy, quế, bạc hà, gừng. Sản phẩm dùng được cho trẻ sơ sinh từ 1 tháng tuổi, trẻ nhỏ, phụ nữ mang thai và cho con bú.',
    },
  },
  {
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09985_6ae3f52230.jpg',
    medicineID: '1223',
    name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
    brand: 'Jpanwell',
    quality: 20,
    price: 120000,
    detail: {
      unit: 'Hộp',
      category: 'Cơ xương khớp',
      dosageForms: 'Viên nang cứng',
      specifications: 'Hộp 120 Viên',
      manufacturingCountry: 'Nhật Bản',
      Producer: 'Have fun Factory Co., Ltd',
      ingredient:
        'Canxi từ vỏ sò, Chất xơ hòa tan, Vi khuẩn acid lactic, Magie, Sắt, Vitamin B2, Vitamin B1, Vitamin D3, Vitamin K2',
      shortDescription:
        'Calcium Premium bổ sung canxi, một số các vitamin (vitamin B1, vitamin B2, vitamin D3, vitamin K2) và khoáng chất (magie, sắt) cho cơ thể; giúp tăng khả năng hấp thụ canxi; hỗ trợ giảm nguy cơ loãng xương.',
    },
  },
  {
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09985_6ae3f52230.jpg',
    medicineID: '1223',
    name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
    brand: 'Jpanwell',
    quality: 20,
    price: 120000,
    detail: {
      unit: 'Hộp',
      category: 'Cơ xương khớp',
      dosageForms: 'Viên nang cứng',
      specifications: 'Hộp 120 Viên',
      manufacturingCountry: 'Nhật Bản',
      Producer: 'Have fun Factory Co., Ltd',
      ingredient:
        'Canxi từ vỏ sò, Chất xơ hòa tan, Vi khuẩn acid lactic, Magie, Sắt, Vitamin B2, Vitamin B1, Vitamin D3, Vitamin K2',
      shortDescription:
        'Calcium Premium bổ sung canxi, một số các vitamin (vitamin B1, vitamin B2, vitamin D3, vitamin K2) và khoáng chất (magie, sắt) cho cơ thể; giúp tăng khả năng hấp thụ canxi; hỗ trợ giảm nguy cơ loãng xương.',
    },
  },
  {
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09985_6ae3f52230.jpg',
    medicineID: '1223',
    name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
    brand: 'Jpanwell',
    quality: 20,
    price: 120000,
    detail: {
      unit: 'Hộp',
      category: 'Cơ xương khớp',
      dosageForms: 'Viên nang cứng',
      specifications: 'Hộp 120 Viên',
      manufacturingCountry: 'Nhật Bản',
      Producer: 'Have fun Factory Co., Ltd',
      ingredient:
        'Canxi từ vỏ sò, Chất xơ hòa tan, Vi khuẩn acid lactic, Magie, Sắt, Vitamin B2, Vitamin B1, Vitamin D3, Vitamin K2',
      shortDescription:
        'Calcium Premium bổ sung canxi, một số các vitamin (vitamin B1, vitamin B2, vitamin D3, vitamin K2) và khoáng chất (magie, sắt) cho cơ thể; giúp tăng khả năng hấp thụ canxi; hỗ trợ giảm nguy cơ loãng xương.',
    },
  },
  {
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09985_6ae3f52230.jpg',
    medicineID: '1223',
    name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
    brand: 'Jpanwell',
    quality: 20,
    price: 120000,
    detail: {
      unit: 'Hộp',
      category: 'Cơ xương khớp',
      dosageForms: 'Viên nang cứng',
      specifications: 'Hộp 120 Viên',
      manufacturingCountry: 'Nhật Bản',
      Producer: 'Have fun Factory Co., Ltd',
      ingredient:
        'Canxi từ vỏ sò, Chất xơ hòa tan, Vi khuẩn acid lactic, Magie, Sắt, Vitamin B2, Vitamin B1, Vitamin D3, Vitamin K2',
      shortDescription:
        'Calcium Premium bổ sung canxi, một số các vitamin (vitamin B1, vitamin B2, vitamin D3, vitamin K2) và khoáng chất (magie, sắt) cho cơ thể; giúp tăng khả năng hấp thụ canxi; hỗ trợ giảm nguy cơ loãng xương.',
    },
  },
  {
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09985_6ae3f52230.jpg',
    medicineID: '1223',
    name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
    brand: 'Jpanwell',
    quality: 20,
    price: 120000,
    detail: {
      unit: 'Hộp',
      category: 'Cơ xương khớp',
      dosageForms: 'Viên nang cứng',
      specifications: 'Hộp 120 Viên',
      manufacturingCountry: 'Nhật Bản',
      Producer: 'Have fun Factory Co., Ltd',
      ingredient:
        'Canxi từ vỏ sò, Chất xơ hòa tan, Vi khuẩn acid lactic, Magie, Sắt, Vitamin B2, Vitamin B1, Vitamin D3, Vitamin K2',
      shortDescription:
        'Calcium Premium bổ sung canxi, một số các vitamin (vitamin B1, vitamin B2, vitamin D3, vitamin K2) và khoáng chất (magie, sắt) cho cơ thể; giúp tăng khả năng hấp thụ canxi; hỗ trợ giảm nguy cơ loãng xương.',
    },
  },
  {
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09985_6ae3f52230.jpg',
    medicineID: '1223',
    name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
    brand: 'Jpanwell',
    quality: 20,
    price: 120000,
    detail: {
      unit: 'Hộp',
      category: 'Cơ xương khớp',
      dosageForms: 'Viên nang cứng',
      specifications: 'Hộp 120 Viên',
      manufacturingCountry: 'Nhật Bản',
      Producer: 'Have fun Factory Co., Ltd',
      ingredient:
        'Canxi từ vỏ sò, Chất xơ hòa tan, Vi khuẩn acid lactic, Magie, Sắt, Vitamin B2, Vitamin B1, Vitamin D3, Vitamin K2',
      shortDescription:
        'Calcium Premium bổ sung canxi, một số các vitamin (vitamin B1, vitamin B2, vitamin D3, vitamin K2) và khoáng chất (magie, sắt) cho cơ thể; giúp tăng khả năng hấp thụ canxi; hỗ trợ giảm nguy cơ loãng xương.',
    },
  },
  {
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09985_6ae3f52230.jpg',
    medicineID: '1223',
    name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
    brand: 'Jpanwell',
    quality: 20,
    price: 120000,
    detail: {
      unit: 'Hộp',
      category: 'Cơ xương khớp',
      dosageForms: 'Viên nang cứng',
      specifications: 'Hộp 120 Viên',
      manufacturingCountry: 'Nhật Bản',
      Producer: 'Have fun Factory Co., Ltd',
      ingredient:
        'Canxi từ vỏ sò, Chất xơ hòa tan, Vi khuẩn acid lactic, Magie, Sắt, Vitamin B2, Vitamin B1, Vitamin D3, Vitamin K2',
      shortDescription:
        'Calcium Premium bổ sung canxi, một số các vitamin (vitamin B1, vitamin B2, vitamin D3, vitamin K2) và khoáng chất (magie, sắt) cho cơ thể; giúp tăng khả năng hấp thụ canxi; hỗ trợ giảm nguy cơ loãng xương.',
    },
  },
  {
    img: 'https://cdn.nhathuoclongchau.com.vn/unsafe/636x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/DSC_09985_6ae3f52230.jpg',
    medicineID: '1223',
    name: 'Viên uống Calcium Premium JpanWell bổ sung canxi, vitamin và khoáng chất (120 viên)',
    brand: 'Jpanwell',
    quality: 20,
    price: 120000,
    detail: {
      unit: 'Hộp',
      category: 'Cơ xương khớp',
      dosageForms: 'Viên nang cứng',
      specifications: 'Hộp 120 Viên',
      manufacturingCountry: 'Nhật Bản',
      Producer: 'Have fun Factory Co., Ltd',
      ingredient:
        'Canxi từ vỏ sò, Chất xơ hòa tan, Vi khuẩn acid lactic, Magie, Sắt, Vitamin B2, Vitamin B1, Vitamin D3, Vitamin K2',
      shortDescription:
        'Calcium Premium bổ sung canxi, một số các vitamin (vitamin B1, vitamin B2, vitamin D3, vitamin K2) và khoáng chất (magie, sắt) cho cơ thể; giúp tăng khả năng hấp thụ canxi; hỗ trợ giảm nguy cơ loãng xương.',
    },
  },
];

export const MOCK_FeatureCategories = [
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
  {
    icon: 'https://cdn.nhathuoclongchau.com.vn/unsafe/24x24/https://cms-prod.s3-sgn09.fptcloud.com/smalls/than_kinh_nao_level_2_b0cc93af6f.png',
    name: 'Thần kinh não',
    quality: 10,
  },
];
export const TO_BE_ANNOUCED_TEXT = 'TBA';
