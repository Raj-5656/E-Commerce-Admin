import CategoryApi, { type categoryData } from "../../api/CategoryApi";
import type { subCategoryData } from "../../api/SubCategoryApi";
import SubCategoryApi from "../../api/SubCategoryApi";
import CommonForm from "../../components/common/CommonForm";
import CommonTable from "../../components/common/CommonTable";

export const subCategoryConfig = {
  tabs: [
    {
      id: "list",
      label: "All Sub Categories",
      component: CommonTable,
    },
    {
      id: "create",
      label: "Create Sub Categories",
      component: CommonForm,
    },
  ],

  table: {
    columns: [
      { name: "name", label: "Name" },
    ],
    fetchUrl: "/category",
  },

  form: {
    defaultValues: {
      name: "",
      categoryId: ""
    },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
      {
        name: "categoryId",
        label: "Category",
        type: "select",
        required: true,
        fetchOptions: async () => {
          const list = await CategoryApi.getALlCategory();
          return list?.data || [];
        }
      }
    ],
    submitApi: async (payload: subCategoryData) => {
      return await SubCategoryApi.createSubCategory(payload);
    }
  },
};
