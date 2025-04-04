// // src/api/axiosInstance.ts
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const axiosInstance = axios.create({
//   baseURL: 'https://api.example.com',
//   timeout: 10000,
//   headers: { 'Content-Type': 'application/json' },
// });

// axiosInstance.interceptors.request.use(async config => {
//   const token = await AsyncStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;
