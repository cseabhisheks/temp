export default function propertyForm( formOpen, setFormOpen, fetchPropertyData ) {
    const formFields = [
        { name: "HName", type: "text",   },
        { name: "HAddress", type: "text",   },
        { name: "HPrice", type: "number",  },
        { name: "EBRate", type: "number",   },
    ];

    const formConfig = {
        title: 'add property',
        formFields: formFields,
        formOpen: formOpen,
        setFormOpen: setFormOpen,
        submitText: 'add',
        modelName: 'property',
        refreshData: fetchPropertyData
    }
    return formConfig

    
}