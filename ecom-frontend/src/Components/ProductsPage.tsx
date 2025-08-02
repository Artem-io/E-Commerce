import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { Group, NativeSelect, TextInput, Text } from "@mantine/core";
import { getAllProducts } from "../Api/ProductsService";
import type { Product } from "../Types/Product";

const ProductsPage = () => 
  {
  const [searchParam, setSearchParam] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState("15");
  const [sortBy, setSortBy] = useState('name');

  const [products, setProducts] = useState<Product[] | null>(null);
    const fetchProducts = async () => {
      try {
        let sortField: string;
        let order: string;

        switch (sortBy) {
          case "Price: Low to High":
          sortField = "price";
          order = "asc";
          break;

          case "Price: High to Low":
          sortField = "price";
          order = "desc";
          break;

          default:
          sortField = "name";
          order = "asc";
          break;
        }

        const response = await getAllProducts(searchParam, page, parseInt(size), sortField, order);
        setProducts(response.data.content);
      } 
      catch (err) {console.log(err)}
    };
    useEffect(() => {fetchProducts()}, [searchParam, size, sortBy]);

  return (
    <div className="p-8">
      <Group mb={20}>

        <TextInput onChange={(e) => setSearchParam(e.currentTarget.value)} radius='md' placeholder="Search" />

        <NativeSelect radius='md' leftSectionWidth={80} leftSection={<Text>Sort by:</Text>}
         onChange={(e) => setSortBy(e.currentTarget.value)} data={["Name", "Price: Low to High", "Price: High to Low"]} />

        <NativeSelect radius='md' defaultValue="15" data={["5", "10", "15", "25", "35", "50"]}
         onChange={(e) => setSize(e.currentTarget.value)} rightSection="Products" rightSectionWidth={80} />

      </Group>

      <ProductsGrid products={products || []} />
    </div>
  );
};

export default ProductsPage;
