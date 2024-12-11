


import React from "react";
import { 
  Box, 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Container, 
  Divider, 
  Grid, 
  List, 
  ListItem, 
  Paper, 
  TextField, 
  Typography 
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  allProductQuery,
  productByCategoryQuery,
  productCategoryQuery,
  useSearchedProductQuery,
} from "@/customHooks/cms.qurey.hooks";
import { allProductProps, IallProductProps } from "@/typeScript/cms.interface";

const AllProducts: React.FC = () => {
  const { data: allProductsData, isPending: allProductsPending } = allProductQuery();
  const { data: allCategoriesData, isPending: allCategoriesPending } = productCategoryQuery();
  const router = useRouter();
  const { query } = router;
  const { data: categoryFilteredData, isPending: categoryFilterPending } = productByCategoryQuery(query.category as string);
  const { data: searchedData, isPending: searchedDataPending, refetch: refetchSearchedData } = useSearchedProductQuery(query.search as string);


  if (allProductsPending || allCategoriesPending) {
    return <Typography align="center" mt={4}>Loading products...</Typography>;
  }

  const categories = Array.isArray(allCategoriesData) ? allCategoriesData : [];
  const products = allProductsData?.products || [];
  const searchProducts = searchedData?.products || [];



  const handleSearch = (e: any) => {
    e.preventDefault()
    if (query.search !== "") {
        refetchSearchedData();
    }
}


  return (
    <Box mt={8} mb={8} sx={{ backgroundColor: "#f5f5f5", padding: "4rem", borderRadius: "20px" }}>
      <Grid container spacing={3}>
        
        {/* Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: "bold", color: "#333" }}>
              Product Categories
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <List>
              {categories.length > 0 ? (
                categories.map((category: { slug: string; name: string }) => (
                  <ListItem
                    key={category.slug}
                    sx={{
                      borderRadius: 1,
                      mb: 1,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateX(10px)",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        backgroundColor: "#e3f2fd",
                      },
                    }}
                  >
                    <Button
                      fullWidth
                      onClick={() => router.push("?category=" + category.slug)}
                      sx={{
                        textTransform: "capitalize",
                        textAlign: "left",
                        color: "#1976d2",
                        fontWeight: "bold",
                      }}
                    >
                      {category.name}
                    </Button>
                  </ListItem>
                ))
              ) : (
                <Typography align="center" sx={{ color: "#757575" }}>
                  No categories available
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>

    
        <Grid item xs={12} sm={8} md={9}>
          <Container maxWidth="lg">
          <form 
                onSubmit={handleSearch}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 2, mb: 2 }}>
                <TextField
                    variant="outlined"
                    type="search"
                    name="search"
                    id="search"
                    // value={input}
                    onChange={(e) => router.push(`/cms/all-products?search=${e.target.value}`)}
                    placeholder="Search..."
                    sx={{
                    width: '300px',
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{
                    height: '56px',
                    }}
                >
                    Search
                </Button>
                </Box>
                </form>
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              sx={{ fontWeight: "bold", color: "#333", mb: 4 ,  }}
            >
              {query.category ? "Filtered Products" : "All Products"}
            </Typography>

            <Grid
                    container
                    spacing={1} // Increase the spacing value
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: '20px' }}
                >
                    {Array.isArray(searchProducts) && searchProducts.length > 0 ? (
                    searchProducts.map((item: allProductProps) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card
                                sx={{
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                                >
                                <Box
                                    sx={{
                                    height: 250,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f9f9f9',
                                    }}
                                >
                                    <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                    }}
                                    />
                                </Box>
                                <CardContent>
                                    <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 'bold', color: '#333' }}
                                    >
                                    {item.title}
                                    </Typography>
                                    <Typography
                                    variant="body2"
                                    sx={{ color: '#757575', marginBottom: '8px' }}
                                    >
                                    Brand: {item.brand || 'N/A'}
                                    </Typography>
                                    <Typography
                                    variant="body2"
                                    sx={{ color: '#757575', marginBottom: '8px' }}
                                    >
                                    {item.description}
                                    </Typography>
                                    <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#4caf50',
                                        fontWeight: 'bold',
                                        marginBottom: '16px',
                                    }}
                                    >
                                    Price: ${item.price ? item.price.toFixed(2) : 'N/A'}
                                    </Typography>
                                    <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    href={`/cms/all-products/${item.id}`}
                                    >
                                    See More
                                    </Button>
                                </CardContent>
                        </Card>
                        </Grid>
                    ))
                    ) : (
                    !query.category ? (
                        Array.isArray(products) && products.length > 0
                        ? products.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <Card
                                sx={{
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                                >
                                <Box
                                    sx={{
                                    height: 250,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f9f9f9',
                                    }}
                                >
                                    <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                    }}
                                    />
                                </Box>
                                <CardContent>
                                    <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 'bold', color: '#333' }}
                                    >
                                    {item.title}
                                    </Typography>
                                    <Typography
                                    variant="body2"
                                    sx={{ color: '#757575', marginBottom: '8px' }}
                                    >
                                    Brand: {item.brand || 'N/A'}
                                    </Typography>
                                    <Typography
                                    variant="body2"
                                    sx={{ color: '#757575', marginBottom: '8px' }}
                                    >
                                    {item.description}
                                    </Typography>
                                    <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#4caf50',
                                        fontWeight: 'bold',
                                        marginBottom: '16px',
                                    }}
                                    >
                                    Price: ${item.price ? item.price.toFixed(2) : 'N/A'}
                                    </Typography>
                                    <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    href={`/cms/all-products/${item.id}`}
                                    >
                                    See More
                                    </Button>
                                </CardContent>
                                </Card>
                            </Grid>
                            ))
                        : <p>No Products available</p>
                    ) : (
                        Array.isArray(categoryFilteredData?.products) && categoryFilteredData?.products?.length > 0
                        ? categoryFilteredData.products.map((item: allProductProps) => (
                            <Grid item xs={12} sm={6} md={4} key={item.id}>
                                <Card
                                sx={{
                                    boxShadow: 3,
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    transition: 'transform 0.2s ease-in-out',
                                    '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                                >
                                <Box
                                    sx={{
                                    height: 250,
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: '#f9f9f9',
                                    }}
                                >
                                    <img
                                    src={item.images[0]}
                                    alt={item.title}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        objectFit: 'contain',
                                    }}
                                    />
                                </Box>
                                <CardContent>
                                    <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 'bold', color: '#333' }}
                                    >
                                    {item.title}
                                    </Typography>
                                    <Typography
                                    variant="body2"
                                    sx={{ color: '#757575', marginBottom: '8px' }}
                                    >
                                    Brand: {item.brand || 'N/A'}
                                    </Typography>
                                    <Typography
                                    variant="body2"
                                    sx={{ color: '#757575', marginBottom: '8px' }}
                                    >
                                    {item.description}
                                    </Typography>
                                    <Typography
                                    variant="h6"
                                    sx={{
                                        color: '#4caf50',
                                        fontWeight: 'bold',
                                        marginBottom: '16px',
                                    }}
                                    >
                                    Price: ${item.price ? item.price.toFixed(2) : 'N/A'}
                                    </Typography>
                                    <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    component={Link}
                                    href={`/cms/all-products/${item.id}`}
                                    >
                                    See More
                                    </Button>
                                </CardContent>
                                </Card>
                            </Grid>
                            ))
                        : <p>No Products found</p>
                    )
                    )}
                </Grid>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AllProducts;





