import { useState } from "react";
import LazyLoad from "react-lazyload";
import { baseUrl } from "~/repositories/Repository";

import ProductRepository from "~/repositories/ProductRepository";

export default function useGetProducts() {
  const [loading, setLoading] = useState(false);
  const [products, setProductItems] = useState(null);
  const [product, setProduct] = useState(null);
  return {
    loading,
    products,
    product,
    setProductItems: (payload) => {
      setProductItems(payload);
    },

    setLoading: (payload) => {
      setLoading(payload);
    },

    thumbnailImage: (payload) => {
      if (payload) {
        return (
          <LazyLoad>
            <img src={baseUrl + "/" + payload.mainImage} alt="image" />
          </LazyLoad>
        );
      }
    },

    getProductsByCollection: async (payload) => {
      setLoading(true);
      const responseData = await ProductRepository.getProducts(payload);
      // const responseData = await getProductsByCollectionHelper(payload);
      if (responseData) {
        setProductItems(responseData);
        setTimeout(
          function () {
            setLoading(false);
          }.bind(this),
          250
        );
      }
    },

    getProductsByCategory: async (payload) => {
      setLoading(true);
      const responseData = await ProductRepository.getProductsByCategory(
        payload
      );
      if (responseData) {
        setProductItems(responseData);
        setTimeout(
          function () {
            setLoading(false);
          }.bind(this),
          250
        );
      }
    },

    getProducts: async (payload) => {
      setLoading(true);
      let responseData;
      if (payload) {
        responseData = await ProductRepository.getProducts(payload);
      } else {
        const queries = {
          _limit: 12,
        };
        responseData = await ProductRepository.getProducts(queries);
      }
      if (responseData) {
        setProductItems(responseData);
        setTimeout(
          function () {
            setLoading(false);
          }.bind(this),
          250
        );
      }
    },

    getProductById: async (payload) => {
      setLoading(true);
      console.log("saSa", payload);
      const responseData = await ProductRepository.getProductsById(payload);
      if (responseData.product) {
        setProduct(responseData.product);
        setTimeout(
          function () {
            setLoading(false);
          }.bind(this),
          250
        );
      }
    },

    getProductBySeller: async () => {
      setLoading(true);
      const responseData = await ProductRepository.getProductsBySeller();
      if (responseData) {
        setProductItems(responseData);
        setTimeout(
          function () {
            setLoading(false);
          }.bind(this),
          250
        );
      }
    },

    statusChanged: async (payload) => {
      const responseData = await ProductRepository.statusChange(payload);
      if (responseData) {
        return responseData;
      } else {
        return null;
      }
    },

    updateImages: async (id, payload) => {
      const responseData = await ProductRepository.updateImages(id, payload);
      if (responseData.status === "Success") {
        return responseData;
      } else {
        return null;
      }
    },
  };
}
