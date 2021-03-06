import axios from 'axios';

const { VUE_APP_APIPATH, VUE_APP_CUSTOMPATH } = process.env;

const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1'); // 讀出 cookie
axios.defaults.headers.common.Authorization = myCookie; // 請求時預設加入 Authorization 欄位

const shopRequest = axios.create({
  baseURL: `${VUE_APP_APIPATH}/api/${VUE_APP_CUSTOMPATH}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const userRequest = axios.create({
  baseURL: `${VUE_APP_APIPATH}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const uploadFileRequest = axios.create({
  baseURL: `${VUE_APP_APIPATH}/api/${VUE_APP_CUSTOMPATH}`,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// 登入與驗證
export const apiSignin = (json) => userRequest.post('/admin/signin', json);
export const apiLogout = () => userRequest.post('/logout');
export const apiUserCheck = () => userRequest.post('/api/user/check');

// 前台 Cart
export const apiGetCart = () => shopRequest.get('/cart');
export const apiRemoveCart = (id) => shopRequest.delete(`/cart/${id}`);
export const apiAddCart = (json) => shopRequest.post('/cart', json);
// 前台 Coupon
export const apiAddCoupon = (json) => shopRequest.post('/coupon', json);
// 前台 Product
export const apiGetAllProducts = () => shopRequest.get('/products/all');
export const apiGetPageProducts = (page) => shopRequest.get(`/products?page=${page}`);
export const apiGetProductDetail = (id) => shopRequest.get(`/product/${id}`);
// 前台 Order
export const apiCreateOrder = (json) => shopRequest.post('/order', json);
export const apiGetOrder = (id) => shopRequest.get(`/order/${id}`);
export const apiPayOrder = (id) => shopRequest.post(`/pay/${id}`);

// 後台 Product
export const apiAdminGetProducts = (page) => shopRequest.get(`/admin/products?page=${page}`);
export const apiAdminAddProduct = (json) => shopRequest.post('/admin/product', json);
export const apiAdminUpdateProduct = (id, json) => shopRequest.put(`/admin/product/${id}`, json);
export const apiAdminDeleteProduct = (id) => shopRequest.delete(`/admin/product/${id}`);
// 後台 Coupon
export const apiAdminGetCoupon = (page) => shopRequest.get(`/admin/coupons?page=${page}`);
export const apiAdminAddCoupon = (json) => shopRequest.post('/admin/coupon', json);
export const apiAdminUpdateCoupon = (id, json) => shopRequest.put(`/admin/coupon/${id}`, json);
export const apiAdminDeleteCoupon = (id) => shopRequest.delete(`/admin/coupon/${id}`);
// 後台 Order
export const apiAdminGetOrder = (page) => shopRequest.get(`/admin/orders?page=${page}`);
// 後台 Upload
export const apiAdminUploadFile = (formData) => uploadFileRequest.post('/admin/upload', formData);
