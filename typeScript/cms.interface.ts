
// for all product//
interface Dimensions {
    width: number;
    height: number;
    depth: number;
  }
  
  interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }
  
  interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  }
export interface IallProductProps {
    products: any;
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
  }
  
  export interface allProductProps extends IallProductProps {
    products: IallProductProps;
  }



// for single product//
export interface singleProductProps extends IallProductProps {
    data: IallProductProps;
}


//for product category//
export interface IproductCategoryProps {
  slug: string;
  name: string;
  url: string;
}

export interface productCategoryProps extends IproductCategoryProps {
  products: IproductCategoryProps;
}



//for product by catregory//
export interface productByCategoryProps extends IallProductProps {
  data: IallProductProps;
}






