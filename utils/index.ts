// const axios = require('axios');
// const url='https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla'

import { CarProps, FilterProps } from "@/app/types";

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '32d59c5bbfmsh0081a52e6d16ee9p1c702fjsnc8dbd1edf4f0',
//     'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
//   }
// };

// try {
// 	const response = await fetch(url,options);
//     const res=await response.text()
// 	console.log(res);
// } catch (error) {
// 	console.error(error);
// }

export async function  fetchCars(filters: FilterProps){
    const { manufacturer, year, model, limit, fuel } = filters;
     const headers: HeadersInit = {
        'X-RapidAPI-Key':process.env.NEXT_PUBLIC_RAPID_API_KEY || "" ,
        'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
      }
      try {
        const response=await fetch( `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,{
        headers:headers,
      });
      const result=await response.json();
      return result;
      } catch (error) {
          console.log(error);
          return error;
      }

      
}

export const calculateCarRent=(city_mpg:number,year:number)=>{
    const basePricePerday=50;
    const mileageFactor=0.1;
    const ageFactor=0.05;

    const mileageRate=city_mpg*mileageFactor;
    const ageRate=(new Date().getFullYear()-year)*ageFactor;
    const rentalRatePerday=basePricePerday+mileageRate+ageRate;
    return rentalRatePerday.toFixed(0);
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;
  
    url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || "");
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);
  
    return `${url}`;
  } 


  export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(type, value);
    const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  
    return newPathname;
  };