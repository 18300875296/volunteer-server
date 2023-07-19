// 加盐加密
import * as crypto from 'crypto';

// 制作随机盐
export const makeSalt = (): string => crypto.randomBytes(3).toString('base64');
export const encryptPassword = (password: string, salt: string): string => {
  if (!password || !salt) return '';
  const tempSalt = Buffer.from(salt, 'base64');
  // 10000代表迭代次数,16代表长度
  return crypto
    .pbkdf2Sync(password, tempSalt, 10000, 16, 'sha512')
    .toString('base64');
};
//生成邮箱验证码
export const generateCode = async (length: number): Promise<string> => {
  try {
    const randomBytes = await crypto.randomBytes(length); //生成指定长度的随机字节异步操作
    return randomBytes.toString('hex').slice(0, length);
  } catch (error) {
    throw new Error('Failed to generate code');
  }
};
