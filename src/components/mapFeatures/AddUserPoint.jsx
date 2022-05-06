import { Button } from "react-bootstrap"
import { useState } from "react"

export default function AddUserPoint({userIsAddingNewMarker, setUserIsAddingNewMarker, latLong, user, setlatLong, setUserPoints}){
    const [text, setText] = useState('')
    const [addingText, setAddingText] = useState(false)

    async function postPoint(){
        let today = new Date()
        let response = await fetch('http://localhost:5000/userpoints/',   {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
    
                  },
                 body: JSON.stringify({latitude:latLong.latitude, longitude:latLong.longitude, found:today, user_id:user.id, notes: text})
            })
            let rData = await response.json()
            setUserPoints(rData)
            setUserIsAddingNewMarker(false)
            setlatLong(undefined)
            setAddingText(false)
    }

    return (
        <div className="point-menu">
            
                
                <div>Click on Map to Choose Locations</div>
                <div>
                {latLong && userIsAddingNewMarker && !addingText && <Button className='mt-3' variant="link" onClick={()=> setAddingText(true)}>Add a Note</Button>}
                {addingText && <textarea onChange={(e)=> setText(e.target.value)} className='usertext'/>}
                </div>
                

                {latLong && userIsAddingNewMarker && <Button className='mt-3' variant="outline-light" onClick={postPoint}>Confirm</Button>}
        </div>
    )

}