
export default function Button({ btn_text, Icon,btn_color,onClick }) {

    return (<>
        <button onClick={onClick}  className={`flex  items-center justify-between border-2 border-primary rounded-xl md:w-[150px] text-center  ${btn_color?btn_color:'bg-accent'} text-primary font-bold capitalize py-1 px-4`}  type='submit'>
            {Icon &&
                <span>
                    <Icon />
                </span>}
            <span className="text-center w-full">
                {btn_text}
            </span>
        </button>


    </>)
}