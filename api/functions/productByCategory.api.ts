

import { productByCategoryProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";


export const productByCategoryAPICall = async (id: string) => {
    const res = await axiosInstance.get<productByCategoryProps>(`${endPoints.product.productByCategory}/${id}`)
    console.log('productByCategoryAPICall res', res);
    return res.data
}