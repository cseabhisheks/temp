import { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";
import { add, update, remove, find } from "../../api/api";

export default function DynamicForm({ formConfig }) {
    const { title, formFields, formOpen, setFormOpen, submitText, modelName, _id, isUpdate, refreshData } = formConfig
    // dynamic form field creation in this way  name: "",  email: "",  phone: "",  address: "",  password: ""
    const initialFormState = formFields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
    }, {});
    const [formData, setFormData] = useState(initialFormState)
    // handle change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
        console.log(formData)
    }

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isUpdate) {
            const res = await update(modelName, formData, _id)
            console.log(res)
            setFormData(initialFormState)
        }
        else {
            const res = await add(modelName, formData)
            console.log(res)
        }
        setFormOpen(false)
        refreshData()
    }
    // update
    const fetchDataforUpdate = async () => {
        console.log(_id)
        const fetchData = await find(modelName, { _id })
        setFormData(fetchData.data[0]);
    }
    useEffect(() => {
        if (isUpdate && formOpen) {
            fetchDataforUpdate();
        }
    }, [isUpdate, formOpen]);   // ✅ RUNS WHEN FORM OPENS

    return (<>

        {formOpen &&
            // div container to blur bg of form 
            <div className="z-10 bg-black/20 backdrop-blur-sm w-[100vw] h-[100vh]  fixed left-0 top-0 flex flex-col justify-center items-center ">
                {/* form */}
                <form onSubmit={handleSubmit} className=" rounded-xl w-[90vw] md:w-[40vw] p-4 bg-primary text-accent" action="">
                    <div className="flex  items-center justify-between">
                        <h1 className="text-2xl capitalize mb-4 font-bold text-gray-200">{title}</h1>
                        <IoClose onClick={() => setFormOpen(false)} className="text-xl" />
                    </div>
                    {formFields.map((elem, idx) => (
                        <label key={idx} htmlFor={elem.name} >
                            <span className="capitalize">{elem.name}</span>
                            <br />
                            <input className="rounded-xl px-2 py-1 mb-4 w-full " type={elem.type} name={elem.name} id={elem.name} placeholder={`enter ${elem.name} `} onChange={handleChange} value={formData[elem.name] || ""} />
                            <br />
                        </label>
                    ))}
                    <Button btn_text={submitText} />
                </form>
            </div>}
    </>)
}