


export default function FilterYear({setYears, years}){

    function changeQueryYear(e){
        if (e.target.checked){
            setYears([...years, Number(e.target.value)])
        }
        else{
            var array = [...years]
            var index = array.indexOf(Number(e.target.value))
            if (index !== -1) {
                array.splice(index, 1);
                setYears(array)
              }
        }
    }
    return (
        <div>
            <input defaultChecked onClick={(e)=> changeQueryYear(e)} type="checkbox" id="2017" name="2017" value="2017"/>
            <label htmlFor="2017">2017</label><br/>
            <input defaultChecked onClick={(e)=> changeQueryYear(e)} type="checkbox" id="2018" name="2018" value="2018"/>
            <label htmlFor="2018">2018</label><br/>
            <input defaultChecked onClick={(e)=> changeQueryYear(e)} type="checkbox" id="2019" name="2019" value="2019"/>
            <label htmlFor="2019">2019</label><br/>
            <input defaultChecked onClick={(e)=> changeQueryYear(e)} type="checkbox" id="2020" name="2020" value="2020"/>
            <label htmlFor="2020">2020</label><br/>
            <input defaultChecked onClick={(e)=> changeQueryYear(e)} type="checkbox" id="2021" name="2021" value="2021"/>
            <label htmlFor="2021">2021</label><br/>
        </div>
    )
}