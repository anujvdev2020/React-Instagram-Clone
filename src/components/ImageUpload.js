import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { useTabContext } from '@mui/base';
import  {db,auth,storage} from "../firebase";
import { FirebaseError } from 'firebase/app';


export default function ImgageUpload({username}){
    const [caption,setCaption]=useState("")
    const [image,setImage]=useState(null)
    const [progress,setProgress]=useState(0)

    const handleChange=(e)=>{
        if(e.target.files[0]){
            
            setImage(e.target.files[0])
        }
    }

    const handleUpload=()=>{
        const uploadTask=storage.ref(`images/${image.name}`).put(image)
        uploadTask.on("state_changed",snapshot=>{
            const progress=Math.round(snapshot.bytesTransferred/snapshot.totalBytes)*100
            setProgress(progress)
        },(err)=>{
            console.log(err)
            alert(err.message)
        },()=>{
            storage
            .ref("images")
            .child(image.child)
            .getDownloadURL()
            .then(url=>{
                db.collection("posts").add({
                    timestamp:FirebaseError.firestone.FieldValue.serverTimeStamp,
                    caption:caption,
                    imageUrl:url,
                    username:username

                })

                setProgress(0);
                setCaption("");
                setImagen(null)
            })
        })
    }

    return <div>ImageUpload
        <progress value={progress} max="100"/>
     <input type="text" placeholder='Enter a caption...' value={caption} onChange={(e)=>setCaption(e.target.value)}/>

        <input type="file" onChange={handleChange}/>
        <Button onChange={handleUpload}>Upload</Button>
    </div>
}