import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dbPool from '../user/database.js';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const createSchemas = async () => {
  const sqlDir = path.join(_dirname, '../sql');

  try {
    // 쿼리 실행
    const sql = fs.readFileSync(sqlDir + '/user_db.sql', 'utf8');
    const queries = sql
      .split(';')
      .map((query) => query.trim())
      .filter((query) => query.length > 0);

    for (const query of queries) {
      await dbPool.query(query);
    }
  } catch (err) {
    console.error('데이터베이스 마이그레이션 에러!!, ', err);
  }
};

createSchemas()
  .then(() => {
    console.log('마이그레이션이 완료되었습니다.');
  })
  .catch((err) => {
    console.error(err);
  });
