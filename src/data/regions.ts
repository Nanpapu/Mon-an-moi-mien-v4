import { Region } from '../types';

// Id của các tỉnh là mã hành chính: https://danhmuchanhchinh.gso.gov.vn/
export const regions: Region[] = [
  {
    id: '01',
    name: 'Hà Nội',
    coordinate: {
      latitude: 21.0285,
      longitude: 105.8542,
    },
    recipes: [
      {
        id: '01_01',
        name: 'Phở Hà Nội',
        region: 'Miền Bắc',
        image: 'images/01/01_01.jpg',
        ingredients: [
          'Bánh phở',
          'Thịt bò',
          'Xương bò',
          'Hành tây',
          'Gừng',
          'Gia vị phở',
        ],
        instructions: [
          'Ninh xương bò với gừng và hành tây trong 6-8 tiếng',
          'Thái thịt bò mỏng',
          'Trần bánh phở',
          'Bày trí các nguyên liệu và chan nước dùng',
        ],
      },
      {
        id: '01_02',
        name: 'Bún Chả Hà Nội',
        region: 'Miền Bắc',
        image: 'images/01/01_02.jpg',
        ingredients: [
          'Bún',
          'Thịt lợn nướng',
          'Chả viên',
          'Rau sống',
          'Nước mắm pha',
        ],
        instructions: [
          'Ướp thịt với gia vị',
          'Nướng thịt và chả',
          'Pha nước mắm',
          'Bày trí kèm bún và rau sống',
        ],
      },
      {
        id: '01_03',
        name: 'Chả Cá Lã Vọng',
        region: 'Miền Bắc',
        image: 'images/01/01_03.jpg',
        ingredients: [
          'Cá lăng',
          'Nghệ',
          'Thì là',
          'Hành lá',
          'Bánh đa',
          'Bún',
        ],
        instructions: [
          'Ướp cá với nghệ và gia vị',
          'Chiên sơ cá',
          'Nướng cá với thì là và hành',
          'Ăn kèm bún hoặc bánh đa',
        ],
      }
    ],
  },
  {
    id: '48',
    name: 'Đà Nẵng',
    coordinate: {
      latitude: 16.0544,
      longitude: 108.2022,
    },
    recipes: [
      {
        id: '48_01',
        name: 'Mì Quảng',
        region: 'Miền Trung',
        image: 'images/48/48_01.jpg',
        ingredients: [
          'Mì Quảng',
          'Tôm',
          'Thịt heo',
          'Đậu phộng',
          'Rau sống',
          'Bánh tráng',
        ],
        instructions: [
          'Nấu nước dùng từ xương heo',
          'Làm sốt từ ớt, tỏi, dầu điều',
          'Trần mì',
          'Bày trí các nguyên liệu và chan nước dùng',
        ],
      },
      {
        id: '48_02',
        name: 'Bánh Tráng Cuốn Thịt Heo',
        region: 'Miền Trung',
        image: 'images/48/48_02.jpg',
        ingredients: [
          'Bánh tráng',
          'Thịt heo luộc',
          'Rau sống',
          'Dưa leo',
          'Nước chấm',
        ],
        instructions: [
          'Luộc thịt heo',
          'Thái thịt mỏng',
          'Cuốn bánh tráng với các nguyên liệu',
          'Chấm với nước mắm pha',
        ],
      }
    ],
  },
  {
    id: '46',
    name: 'Thừa Thiên Huế',
    coordinate: {
      latitude: 16.4637,
      longitude: 107.5909,
    },
    recipes: [
      {
        id: '46_01',
        name: 'Bún Bò Huế',
        region: 'Miền Trung',
        image: 'images/46/46_01.jpg',
        ingredients: [
          'Bún',
          'Thịt bò',
          'Giò heo',
          'Mắm ruốc',
          'Sả',
          'Ớt',
        ],
        instructions: [
          'Nấu nước dùng với sả và ớt',
          'Thêm mắm ruốc',
          'Nấu thịt bò và giò heo',
          'Bày trí với bún và rau sống',
        ],
      },
      {
        id: '46_02',
        name: 'Cơm Hến',
        region: 'Miền Trung',
        image: 'images/46/46_02.jpg',
        ingredients: [
          'Cơm nguội',
          'Hến',
          'Rau thơm',
          'Đậu phộng',
          'Mắm ruốc',
        ],
        instructions: [
          'Xào hến với gia vị',
          'Trộn cơm với nước hến',
          'Thêm rau thơm và đậu phộng',
          'Ăn kèm mắm ruốc pha',
        ],
      }
    ],
  },
  {
    id: '79',
    name: 'TP. Hồ Chí Minh',
    coordinate: {
      latitude: 10.7769,
      longitude: 106.7009,
    },
    recipes: [
      {
        id: '79_01',
        name: 'Cơm Tấm Sườn Bì Chả',
        region: 'Miền Nam',
        image: 'images/79/79_01.jpg',
        ingredients: [
          'Cơm tấm',
          'Sườn nướng',
          'Bì heo',
          'Chả trứng',
          'Đồ chua',
          'Nước mắm',
        ],
        instructions: [
          'Nướng sườn với gia vị',
          'Làm bì heo và chả trứng',
          'Pha nước mắm',
          'Bày trí với cơm tấm và đồ chua',
        ],
      },
      {
        id: '79_02',
        name: 'Hủ Tiếu Nam Vang',
        region: 'Miền Nam',
        image: 'images/79/79_02.jpg',
        ingredients: [
          'Hủ tiếu',
          'Thịt heo',
          'Tôm',
          'Gan heo',
          'Giá đỗ',
          'Hành lá',
        ],
        instructions: [
          'Nấu nước dùng xương heo',
          'Chế biến các loại thịt',
          'Trần hủ tiếu',
          'Bày trí với nước dùng và gia vị',
        ],
      }
    ],
  },
  {
    id: '92',
    name: 'Cần Thơ',
    coordinate: {
      latitude: 10.0452,
      longitude: 105.7469,
    },
    recipes: [
      {
        id: '92_01',
        name: 'Bún Cá Cần Thơ',
        region: 'Miền Nam',
        image: 'images/92/92_01.jpg',
        ingredients: [
          'Cá lóc',
          'Bún',
          'Rau sống',
          'Cà chua',
          'Dọc mùng',
          'Bạc hà'
        ],
        instructions: [
          'Làm sạch cá và phi lê',
          'Nấu nước dùng từ xương cá',
          'Chiên cá giòn',
          'Bày trí với bún và rau sống'
        ],
      },
      {
        id: '92_02',
        name: 'Bánh Cống',
        region: 'Miền Nam',
        image: 'images/92/92_02.jpg',
        ingredients: [
          'Tôm',
          'Đậu xanh',
          'Thịt băm',
          'Bột gạo',
          'Hành tím'
        ],
        instructions: [
          'Xay đậu xanh nhuyễn',
          'Trộn bột với nguyên liệu',
          'Chiên bánh vàng giòn',
          'Ăn kèm rau sống và nước mắm'
        ],
      }
    ],
  },
  {
    id: '75',
    name: 'Đồng Nai',
    coordinate: {
      latitude: 10.9574,
      longitude: 106.8426,
    },
    recipes: [
      {
        id: '75_01',
        name: 'Bánh Bèo Biên Hòa',
        region: 'Miền Nam',
        image: 'images/75/75_01.jpg',
        ingredients: [
          'Bột gạo',
          'Tôm khô',
          'Mỡ hành',
          'Đậu xanh',
          'Nước cốt dừa'
        ],
        instructions: [
          'Pha bột bánh bèo',
          'Hấp bánh trong khuôn nhỏ',
          'Làm nhân tôm khô',
          'Rắc mỡ hành và ăn với nước mắm'
        ],
      }
    ],
  },
  {
    id: '54',
    name: 'Phú Yên',
    coordinate: {
      latitude: 13.1056,
      longitude: 109.2929,
    },
    recipes: [
      {
        id: '54_01',
        name: 'Mắt Cá Ngừ Đại Dương',
        region: 'Miền Trung',
        image: 'images/54/54_01.jpg',
        ingredients: [
          'Mắt cá ngừ',
          'Sả',
          'Ớt',
          'Hành tím',
          'Gừng'
        ],
        instructions: [
          'Sơ chế mắt cá ngừ',
          'Ướp gia vị',
          'Nấu canh chua',
          'Thêm rau răm và ăn nóng'
        ],
      }
    ],
  },
  {
    id: '36',
    name: 'Nam Định',
    coordinate: {
      latitude: 20.4333,
      longitude: 106.1667,
    },
    recipes: [
      {
        id: '36_01',
        name: 'Phở Bò Nam Định',
        region: 'Miền Bắc',
        image: 'images/36/36_01.jpg',
        ingredients: [
          'Bánh phở Nam Định',
          'Thịt bò',
          'Xương ống',
          'Gừng',
          'Hành tây',
          'Quế, thảo quả'
        ],
        instructions: [
          'Ninh xương làm nước dùng',
          'Thái thịt bò mỏng',
          'Trần bánh phở',
          'Bày trí và thêm gia vị'
        ],
      }
    ],
  },
  {
    id: '95',
    name: 'Bạc Liêu',
    coordinate: {
      latitude: 9.2940,
      longitude: 105.7216,
    },
    recipes: [
      {
        id: '95_01',
        name: 'Bánh Cống Bạc Liêu',
        region: 'Miền Nam',
        image: 'images/95/95_01.jpg',
        ingredients: [
          'Tôm tươi',
          'Thịt băm',
          'Đậu xanh',
          'Bột gạo',
          'Hành tím'
        ],
        instructions: [
          'Xay nhuyễn đậu xanh',
          'Trộn bột với nguyên liệu',
          'Chiên vàng giòn',
          'Ăn kèm rau sống'
        ],
      }
    ],
  },
  {
    id: '19',
    name: 'Thái Nguyên',
    coordinate: {
      latitude: 21.5667,
      longitude: 105.8250,
    },
    recipes: [
      {
        id: '19_01',
        name: 'Cơm Lam Thái Nguyên',
        region: 'Miền Bắc',
        image: 'images/19/19_01.jpg',
        ingredients: [
          'Gạo nếp',
          'Ống tre',
          'Lá dong',
          'Muối',
          'Nước suối'
        ],
        instructions: [
          'Ngâm gạo nếp',
          'Cho vào ống tre',
          'Nướng trên than hoa',
          'Ăn kèm muối vừng'
        ],
      }
    ],
  }
]; 