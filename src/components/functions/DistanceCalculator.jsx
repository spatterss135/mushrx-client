

export default function DistanceCalculator(user, morel){

    // Calculating how far points are on a map
    // 1 degree of latitude is 69 miles
    // 1 degree of longitude is 54.6 miles

    // Distance = sqrt((x2-x1)**2 + (y2-y1)**2)
    // x = horizontal distance = longitude
    // y= vertical distance = latitude

    // x1,y1 will be users location
     
    let longs = (user.longitude -morel.longitude) *54.6
    let lats = (user.latitude - morel.latitude) * 69
    let middle = longs**2 +lats**2
    return Math.sqrt(middle)

}