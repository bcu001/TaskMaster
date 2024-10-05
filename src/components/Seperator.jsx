export default function Seperator({s_gap, s_color}){
    return(
        <>
            <div className={`border my-${s_gap} border-${s_color}`}></div>
        </>
    )
}