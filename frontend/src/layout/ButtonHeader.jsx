import { IoMdAdd } from "react-icons/io"
import Button from "../component/Button/Button"
export default function ButtonHeader({ content }) {
    const { heading, description, setFormOpen } = content
    return (<>
        <div className="flex items-center justify-between gap-8 w-full p-4 md:p-8">
            <div className="capitalize w-full">
                <div className="flex justify-between">
                    <h1 className="text-lg md:text-xl text-secondary  font-bold tracking-wider ">{heading}</h1>
                    {
                        setFormOpen && <span onClick={() => setFormOpen(true)} >
                            <Button btn_text={'add'} Icon={IoMdAdd} />
                        </span>
                    }
                </div>

                <span className="text-xs md:text-base ">
                    {description}
                </span>
            </div>
        </div>
    </>)
}