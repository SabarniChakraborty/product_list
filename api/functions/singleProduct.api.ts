
import { singleProductProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";


export const singleProductAPICall = async (id: string) => {
    const res = await axiosInstance.get<singleProductProps>(`${endPoints.product.singleProduct}/${id}`)
    console.log('singleProductAPICall res', res);
    return res.data
}