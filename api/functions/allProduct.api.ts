
import { allProductProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";


export const allProductAPICall = async () => {
    const res = await axiosInstance.get<allProductProps>(endPoints.product.allProducts)
    // console.log('allProductAPICall res', res);
    return res.data
}
