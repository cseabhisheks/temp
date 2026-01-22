export default function tenantForm(formOpen, setFormOpen, fetchTenantData) {
    const formFields = [
        { name: "TName", type: "text" },       // Tenant Name
        { name: "TAge", type: "number" },      // Tenant Age (optional)
        { name: "TPhone", type: "text" },      // Tenant Phone
        { name: "TRent", type: "number" },     // Rent Amount
        { name: "RoomNo", type: "text" },      // Room Number
    ];

    const formConfig = {
        title: 'Add Tenant',
        formFields: formFields,
        formOpen: formOpen,
        setFormOpen: setFormOpen,
        submitText: 'Add',
        modelName: 'tenant',
        refreshData: fetchTenantData
    };

    return formConfig;
}
