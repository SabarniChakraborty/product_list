import { allProductAPICall } from "@/api/functions/allProduct.api";
import { productByCategoryAPICall } from "@/api/functions/productByCategory.api";
import { productCategoryAPICall } from "@/api/functions/productCategory.api";
import { getSearchedDataAPICall } from "@/api/functions/searchProducts.api";
import { singleProductAPICall } from "@/api/functions/singleProduct.api";
import { allProductProps, IallProductProps, IproductCategoryProps, singleProductProps } from "@/typeScript/cms.interface";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

//for all Product//
export const allProductQuery = (): UseQueryResult<IallProductProps, unknown> => {
    return useQuery({
      queryKey: ["PRODUCTS"],
      queryFn: allProductAPICall
    });
  };


//for single Product//
export const singleProductQuery = (id : string ): UseQueryResult<singleProductProps, unknown> => {
    return useQuery({
      queryKey: ["SINGLE-PRODUCT", id],
      queryFn: () => singleProductAPICall(id)
    });
  };


//for product category//
export const productCategoryQuery = (): UseQueryResult<IproductCategoryProps, unknown> => {
    return useQuery({
      queryKey: ["PRODUCT-CATEGORY"],
      queryFn: productCategoryAPICall
    });
  };


//for product by category//
export const productByCategoryQuery = (category: string): UseQueryResult<IallProductProps, unknown> => {
    return useQuery({
      queryKey: ["PRODUCT-BY-CATEGORY", category],
      queryFn: () => productByCategoryAPICall(category),
      enabled: !!category,
    });
  };



 //for search product//
export const useSearchedProductQuery = (search:string):UseQueryResult<allProductProps,unknown>=>{
    return useQuery({
        queryKey:["SEARCHED_DATA",search],
        queryFn:getSearchedDataAPICall,
        enabled:false
    })
}