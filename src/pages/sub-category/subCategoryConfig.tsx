import CategoryApi from "../../api/CategoryApi";
import SubCategoryApi, { type subCategoryData } from "../../api/SubCategoryApi";
import CommonForm from "../../components/common/CommonForm";
import CommonTable from "../../components/common/CommonTable";
import moment from "moment";

const subCategoryColumns = [
  {
    name: "Name",           // Column header
    selector: (row: any) => row.name, // ✅ Required: how to get value from row
    sortable: true,
    width: '30%'
  },
  {
    name: "Parent Category",           // Column header
    selector: (row: any) => row.categoryId.name , // ✅ Required: how to get value from row
    sortable: true,
    width: '30%'
  },
  {
    name: "isActive",           // Column header
    selector: (row: any) => row.isActive ? 'Yes' : 'No', // ✅ Required: how to get value from row
    sortable: true,
    width: '20%'
  },
  {
    name: "createdAt",           // Column header
    selector: (row: any) => moment(row?.createdAt).format("DD-MM-YYYY") || "N/A", // ✅ Required: how to get value from row
    sortable: true,
    width: '20%'
  }
];
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
    columns: subCategoryColumns,
    dataFetcher: async () => {
      const response = await SubCategoryApi.getAllSubCategory();
      if (!response.success) {
        throw new Error(response.message || "Failed to fetch categories");
      }
      // ✅ FIX: Use response.categories (not response.data)
      return response.data;
    },
    loadingComponent: (
      <div className="p-4 text-blue-500 flex items-center" >
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" > </circle>
          < path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.314 0-6-2.686-6-6z" > </path>
        </svg>
        Loading categories...
      </div>
    ),
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
          const list = await CategoryApi.getAllCategory();
          return list?.data || [];
        }
      }
    ],
    submitApi: async (payload: subCategoryData) => {
      return await SubCategoryApi.createSubCategory(payload);
    }
  },
};
