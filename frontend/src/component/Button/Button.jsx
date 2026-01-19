
export default function Button({ btn_text, Icon }) {

    return (<>
        <button className="flex  items-center justify-between border-2 border-primary rounded-xl w-[150px] text-center bg-accent text-primary font-bold capitalize py-1 px-4" type="submit">
            {Icon &&
                <span>
                    <Icon />
                </span>}
            <span>
                {btn_text}
            </span>
        </button>


    </>)
}