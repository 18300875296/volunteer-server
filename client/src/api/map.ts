import { key, baseURL } from '../../config/map';

interface Address {
  adcode: number;
  name: string;
}
export const getProvincesAPI = async (): Promise<Address[]> => {
  try {
    const url = `${baseURL}key=${key}&keywords=中国&subdistrict=1&extensions=all&level=province`;
    const response = await fetch(url);
    const data = await response.json();
    const { districts } = data.districts[0];
    const provinces: Address[] = districts.map(({ adcode, name }: { adcode: number; name: string }) => ({
      adcode,
      name,
    }));
    return provinces;
  } catch (error) {
    throw console.warn(`获取省份数据出错${error}`);
  }
};
export const getCitiesAPI = async (keyword: string): Promise<Address[]> => {
  try {
    const url = `${baseURL}key=${key}&keywords=${keyword}&subdistrict=1&extensions=all&level=city`;
    const response = await fetch(url);
    const data = await response.json();
    const { districts } = data.districts[0];
    const cities: Address[] = districts.map(({ adcode, name }: { adcode: number; name: string }) => ({
      adcode,
      name,
    }));
    return cities;
  } catch (error) {
    throw console.warn(`获取市区数据出错${error}`);
  }
};
export const getCountriesAPI = async (keyword: string): Promise<Address[]> => {
  try {
    const url = `${baseURL}key=${key}&keywords=${keyword}&subdistrict=1&extensions=all&level=district`;
    const response = await fetch(url);
    const data = await response.json();
    const { districts } = data.districts[0];
    const countries: Address[] = districts.map(({ adcode, name }: { adcode: number; name: string }) => ({
      adcode,
      name,
    }));
    return countries;
  } catch (error) {
    throw console.warn(`获取县城数据出错${error}`);
  }
};
