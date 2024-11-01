import { toCamelCase } from '../../utils/transformCase.js';
import dbPool from '../database.js';
import { USER_QUERIES } from './user.queries.js';

export const findUserByDeviceId = async (deviceId) => {
  const [rows] = await dbPool.query(USER_QUERIES.FIND_USER_BY_DEVICE_ID, [deviceId]);
  return toCamelCase(rows[0]);
};

// 에러 핸들링 추가 해도 좋음
export const createUser = async (deviceId) => {
  await dbPool.query(USER_QUERIES.CREATE_USER, [deviceId]);
  return { deviceId };
};

// 에러 핸들링 추가 해도 좋음
export const updateUserLogin = async (deviceId) => {
  await dbPool.query(USER_QUERIES.UPDATE_USER_LOGIN, [deviceId]);
};

// 에러 핸들링 추가 해도 좋음
export const updateUserLocation = async (x, y, deviceId) => {
  await dbPool.query(USER_QUERIES.UPDATE_USER_LOCATION, [x, y, deviceId]);
};
