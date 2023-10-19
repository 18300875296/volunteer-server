interface DataBase {
  type: string;
  database: string;
  host: string;
  port: number;
  user: string;
  password: string;
  connectionLimit: number; //连接限制
}
const productConfig = {
  db: <DataBase>{
    type: 'mysql',
    database: 'app_service',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456zxw',
    connectionLimit: 10, //连接限制
  },
};
const localConfig = {
  db: <DataBase>{
    type: 'mysql',
    database: 'app_service',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456zxw',
    connectionLimit: 10, //连接限制
  },
};
//本地运行是没有process.env.NODE_ENV 借此区分开发环境和生产环境
const { db } = process.env.NODE_ENV ? productConfig : localConfig;
export default db;
