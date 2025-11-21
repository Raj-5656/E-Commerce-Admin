import CommonForm from "../../components/common/CommonForm";
import CommonTable from "../../components/common/CommonTable";

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
    columns: [
      { name: "name", label: "Name" },
    ],
    fetchUrl: "/category",
  },

  form: {
    defaultValues: {
      name: "",
    },
    fields: [
      { name: "name", label: "Name", type: "text", required: true },
    ],
    submitUrl: "/category",
  },
};
