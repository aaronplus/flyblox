import { useState } from "react";
import CategoryRepository from "~/repositories/CategoryRepository";

export default function useGetCategories() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null);
  return {
    loading,
    categories,
    category,

    setCategories: (payload) => {
      setCategories(payload);
    },

    setCategory: (payload) => {
      setCategory(payload);
    },

    setLoading: (payload) => {
      setLoading(payload);
    },

    getCategories: async () => {
      let responseData;
      setLoading(true);
      responseData = await CategoryRepository.getCategories();
      if (responseData) {
        setTimeout(
          function () {
            setCategories(responseData);
            setLoading(false);
          }.bind(this),
          250
        );
      } else {
        setLoading(false);
      }
    },

    getCategory: async (payload) => {
      let responseData;
      responseData = await CategoryRepository.getCategory(payload);
      if (responseData) {
        setTimeout(
          function () {
            setCategory(responseData);
          }.bind(this),
          250
        );
      } else {
        setLoading(false);
      }
    },
  };
}
