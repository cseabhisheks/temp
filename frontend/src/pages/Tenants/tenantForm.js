export default function tenantForm(
  formOpen,
  setFormOpen,
  fetchTenantData,
  selectedTenant,
  vacantRooms = []
) {
  const formFields = [
    { name: "TName", type: "text" },
    { name: "TPhone", type: "text" },
    { name: "Room", type: "select" },
    { name: "effectiveDate", type: "date" },
  ];

  return {
    title: selectedTenant ? "Update Tenant" : "Add Tenant",
    formFields,
    formOpen,
    setFormOpen,
    submitText: selectedTenant ? "Update" : "Add",
    modelName: "tenant",
    _id: selectedTenant?.tenantId,       // use tenantId here
    isUpdate: !!selectedTenant?.tenantId, // check tenantId
    refreshData: fetchTenantData,
    refData: {
      Room: vacantRooms,
    },
  };
}
