import { useState } from "react"
import { IoClose } from "react-icons/io5";
import Button from "../Button/Button";
export default function DynamicForm({ title, formFields, formOpen, setFormOpen, submitText }) {
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
    const handleSubmit = async (e) => {
        e.preventDefault()
     console.log(formData)//here is the captured data
    }
    return (<>

        {formOpen &&
        // div container to blur bg of form 
            <div className="bg-black/20 backdrop-blur-sm w-[100vw] h-[100vh]  fixed left-0 top-0 flex flex-col justify-center items-center ">
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
                            <input className="rounded-xl px-2 py-1 mb-4 w-full " type={elem.type} name={elem.name} id={elem.name} placeholder={`enter ${elem.name} `} onChange={handleChange} />
                            <br />
                        </label>
                    ))}
                    <Button btn_text={submitText} />
                </form>
            </div>}
    </>)
}