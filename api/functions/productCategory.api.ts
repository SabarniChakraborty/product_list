
import { productCategoryProps } from "@/typeScript/cms.interface";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";



export const productCategoryAPICall = async () => {
    const res = await axiosInstance.get<productCategoryProps>(endPoints.product.productCategories)
    // console.log('productCategoryAPICall res', res);
    return res.data
}
