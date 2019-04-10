export const APICONFIG = {
    BASEPOINT: 'https://cuongpham.herokuapp.com',
    USER:{
        CREATE_USER:'/api/User/CreateUser',
        UPDATE_USER:'/api/User/UpdateUser',
        GET_ALL_USER:'/api/User/GetUser',
        UPLOAD_AVATAR:'/api/User/UploadAvatar',
        GET_INFOR_USER:'/api/User/GetInforUser',
        CHANGE_PASSWORD:'/api/User/ChangePassword',
        FORGET_PASSWORD:'/api/User/FogetPassword',
        UPDATE_USER_BY_ADMIN:'/api/User/UpdateUserByAdmin',
        DELETE_USER:'/api/User/DeleteUser/'

    },
    THANHTOAN: {
        GETALL: '/api/thanhtoan/getallthanhtoan',
        EDITTHANHTOAN: '/api/thanhtoan/editthanhtoan',
        GETALLBYUSER: (iduser) => `/api/thanhtoan/getallthanhtoanbyuser/${iduser}`
    },
    RENTHOUSE: {
        CREATE_RENTHOUSE: '/api/RentHouse/create',
        GETID_RENTHOUSE: (id) => `/api/RentHouse/getOneRentHouse/${id}`,
        DELETERENTHOUSE: '/api/RentHouse/deleteRentHouse',
        QUANLYHOAHONG: (id) => `/api/RentHouse/quanlyhoahong/${id}`
    },
    TAOYEUCAUTHUENHA: {
        TAOYEUCAUTHUENHA: '/api/guiyeucauthuenha/taoyeucauthuenha',
        CHECK_NGOI_NHA_DA_THUE: (idngoinha, idnguoigui) =>  `/api/guiyeucauthuenha/checkngoinhadathue?idngoinha=${idngoinha}&idnguoigui=${idnguoigui}`,
        DELETE_NHA_DA_THUE: (idngoinha, idnguoigui) =>  `/api/guiyeucauthuenha/xoangoinhadathue?idngoinha=${idngoinha}&idnguoigui=${idnguoigui}`,
    },
    AUTH: {
      LOGIN: '/api/auth/login',
      LOGOUT: '/api/auth/logout'
    },
    ROOM: {
        CREATE_ROOM:'/api/Room/CreateRoom',
        GET_ROOMS:'/api/Room/GetRoom',
        UPDATE_ROOM:'/api/Room/UpdateRoom/',
        DELETE_ROOM:'/api/Room/DeleteRoom/',
        GET_ROOM_BY_USER:'/api/Room/GetRoomByUser/',
        GET_ROOM_BY_ID:'/api/Room/getRoomById',
        TRANSACTION:'/api/Room/Transaction/' ,
        CHANGESTATUSUSER: '/api/Room/changestatususer',
        LAYCACBAIDANGCUAUSER: (id) => `/api/Room/laycacbaidangcuauser/${id}`,
        LAYLICHSUYEUCAUTHUENHA: (iduser) => `/api/Room/laylichsuyeucauthuenha/${iduser}`,
        LAYMANGTOADOLOCATION: '/api/Room/laymangtoadolocation'
    },
    HISTORY:{
        GET_HISTORY:'/api/History/GetHistory',
        GET_HISTORY_ADMIN:'/api/History/GetHistoryAdmin'
    },
    CONTACT: {
        CREATE_CONTACT:'/api/Contact/CreateContact',
        GET_CONTACT:'/api/Contact/GetContact',
    },
    RATING: {
        UPDATE: (id) => `/api/Room/UpdateRoomRate/${id}`,
    }

}