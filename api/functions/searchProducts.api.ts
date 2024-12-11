
import { QueryFunction } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { allProductProps } from "@/typeScript/cms.interface";
import { endPoints } from "../endPoints/endPoints";



export const getSearchedDataAPICall:QueryFunction<allProductProps> = async({queryKey})=>{
    const search = queryKey[1];
    const res = await axiosInstance.get<allProductProps>(endPoints.product.searchProduct+`?q=${search}`);
    return res.data;
}