import { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";
import { add, update, remove, find } from "../../api/api";

export default function DynamicForm({ formConfig, refData }) {
    const { title, formFields, formOpen, setFormOpen, submitText, modelName, _id, isUpdate, refreshData, hiddenData } = formConfig;

    // Helper to format date for <input type="date">
    const formatDateForInput = (date) => date ? new Date(date).toISOString().split("T")[0] : "";

    // Initialize formData using defaultValues from formFields
    const initialFormState = formFields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || "";
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormState);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...formData, ...hiddenData };

        if (isUpdate) {
            await update(modelName, payload, _id);
        } else {
            await add(modelName, payload);
        }

        setFormData(initialFormState);
        setFormOpen(false);
        refreshData();
    };

    // Fetch data for update
    const fetchDataforUpdate = async () => {
        if (!_id) return;
        const fetchData = await find(modelName, { _id });
        if (fetchData?.data?.length > 0) {
            const data = fetchData.data[0];

            // Format date field for <input type="date">
            const updatedFormData = { ...data };
            formFields.forEach((field) => {
                if (field.type === "date" && data[field.name]) {
                    updatedFormData[field.name] = formatDateForInput(data[field.name]);
                }
            });

            setFormData(updatedFormData);
        }
    };

    useEffect(() => {
        if (isUpdate && formOpen) {
            fetchDataforUpdate();
        }
    }, [isUpdate, formOpen]);

    return (
        <>
            {formOpen && (
                <div className="z-10 bg-black/20 backdrop-blur-sm w-[100vw] h-[100vh] fixed left-0 top-0 flex flex-col justify-center items-center">
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-xl w-[90vw] md:w-[40vw] p-4 bg-primary text-accent"
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl capitalize mb-4 font-bold text-gray-200">{title}</h1>
                            <IoClose onClick={() => setFormOpen(false)} className="text-xl" />
                        </div>

                        {formFields.map((elem, idx) => (
                            <label key={idx} htmlFor={elem.name}>
                                <span className="capitalize">{elem.name}</span>
                                <br />
                                {elem.type === "select" ? (
                                    <select
                                        name={elem.name}
                                        value={formData[elem.name] || ""}
                                        onChange={handleChange}
                                        className="rounded-xl px-2 py-1 mb-4 w-full"
                                    >
                                        <option value="">Select Room</option>
                                        {refData?.[elem.name]?.length > 0 ? (
                                            refData[elem.name].map((room) => (
                                                <option
                                                    key={room._id}
                                                    value={room._id}
                                                >
                                                    {room.RoomNo}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No vacant rooms</option>
                                        )}
                                    </select>
                                ) : (
                                    <input
                                        type={elem.type}
                                        name={elem.name}
                                        value={formData[elem.name] || ""}
                                        onChange={handleChange}
                                        className="rounded-xl px-2 py-1 mb-4 w-full"
                                    />
                                )}
                            </label>
                        ))}

                        <Button btn_text={submitText} />
                    </form>
                </div>
            )}
        </>
    );
}
