// config/categoryConfig.ts
import moment from "moment";
import CategoryApi, { type categoryData } from "../../api/CategoryApi";
import CommonForm from "../../components/common/CommonForm";
import CommonTable from "../../components/common/CommonTable";

// ✅ 1. Fix columns: Use RDT's required format
const categoryColumns = [
  {
    name: "Name",           // Column header
    selector: (row: any) => row.name, // ✅ Required: how to get value from row
    sortable: true,
    width: '40%'
  },
  {
    name: "isActive",           // Column header
    selector: (row: any) => row.isActive ? 'Yes' : 'No', // ✅ Required: how to get value from row
    sortable: true,
    width: '40%'
  },
  {
    name: "createdAt",           // Column header
    selector: (row: any) => moment(row?.createdAt).format("DD-MM-YYYY") || "N/A", // ✅ Required: how to get value from row
    sortable: true,
    width: '20%'
  }
];

export const categoryConfig = {
  tabs: [
    {
      id: "list",
      label: "All Categories",
      component: CommonTable,
    },
    {
      id: "create",
      label: "Create Categories",
      component: CommonForm,
    },
  ],
  table: {
    columns: categoryColumns, // ✅ Fixed columns
    dataFetcher: async () => {
      const response = await CategoryApi.getAllCategory();
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
    },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
    ],
    submitApi: async (payload: categoryData) => {
      return await CategoryApi.createCategory(payload);
    }
  },
};