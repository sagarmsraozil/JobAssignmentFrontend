import React,{useState} from 'react'

const useCommon = () => {
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer BA673A414C3B44C98478BB5CF10A0F832574090C`
            }
        }
    })

    return {auth};
}

export default useCommon
