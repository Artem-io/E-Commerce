import { useEffect, useState } from "react";
import ProductsGrid from "./ProductsGrid";
import { Group, TextInput, Text, Select } from "@mantine/core";
import { getAllProducts } from "../Api/ProductsService";
import type { Product } from "../Types/Product";
import { IoSearch } from "react-icons/io5";

const ProductsPage = () => 
  {
  const [searchParam, setSearchParam] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState('15');
  const [sortBy, setSortBy] = useState('Name');

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

        <TextInput leftSection={<IoSearch size={20} />}
         onChange={(e) => setSearchParam(e.currentTarget.value)} radius='md' placeholder="Search" />

        <Select radius='md' leftSectionWidth={75} leftSection={<Text>Sort by:</Text>} w={230} allowDeselect={false}
        comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, radius: "md", shadow: "md" }}
        value={sortBy} onChange={e => setSortBy(e)} data={["Name", "Price: Low to High", "Price: High to Low"]} />

        <Select radius='md' value={size} data={["5", "10", "15", "25", "35", "50"]} allowDeselect={false}
        comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 }, radius: "md", shadow: "md" }}
         onChange={e => setSize(e)} rightSection="Products" w={110} rightSectionWidth={80} />

      </Group>

      <ProductsGrid products={products || []} />
    </div>
  );
};

export default ProductsPage;
