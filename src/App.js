import "./styles.css";
import { useState, useEffect } from "react";
import { Post } from "./components/Post";
import  {db,auth} from "./firebase";
import { doc, onSnapshot,collection } from "firebase/firestore";
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import ImgageUpload from "./components/ImageUpload";




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function App() {
  const [posts, setPosts] = useState([]);
  const [open,setOpen]= useState(false);
  const [userName,setUserName]=useState("")
  const [userEmail,setUserEmail]=useState("")
  const [userPassword,setUserPassword]=useState("")
  const [openSignIn,setOpenSignIn]=useState(false)

  const [user,setUser]=useState(null)

  const signUp = (e) =>{
    e.preventDefault();
   

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
    .then(authuser=>{
      console.log("AAAAAAA",authuser)
      return updateProfile(authuser.user,{
          displayName:userName
        })
    })
    .catch((err)=>alert(err.code))

// const res=await createUserWithEmailAndPassword(auth, userEmail, userPassword)
// return await updateProfile(res.user,{
//   displayName:userName
// })
  }
  const signIn=e=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, userEmail, userPassword)
    .catch((err)=>alert(err.meassage))
    setOpenSignIn(false)
  
  
  
  }
  useEffect(()=>{
  const unsubscribe=  auth.onAuthStateChanged((authUser)=>{
        if(authUser){
          console.log(authUser)
          setUser(authUser);
        }
        else{
          setUser(null)
        }
    })
    return ()=>{
      unsubscribe();
    }

  },[user,userName])

  useEffect(() => {
    onSnapshot(collection(db,'posts'),(snapshot)=>{
      setPosts(snapshot.docs.map(doc=>({
        id:doc.id,
       post: doc.data(),

      })))
    })
  }, [posts]);
  return (
    <div className="App">
      {/* //SignUp Modal */}
      {user?.displayName?<ImgageUpload username={user.displayName}/>
:<h3>Sorry You Need to Login </h3>}
       <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="app_SignUp">
          <center>
          <img
          className="app-headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        </center>
        <Input type="text" placeholder="Username" onChange={(e)=>setUserName(e.target.value)} value={userName}/>
        <Input type="text" placeholder="Email" onChange={(e)=>setUserEmail(e.target.value)} value={userEmail}/>
        <Input type="password" placeholder="Password" onChange={(e)=>setUserPassword(e.target.value)} value={userPassword}/>
        <Button onClick={signUp} variant="text">Sign Up</Button>   

          </form>

        </Box>
      </Modal>

      {/* //Sign In modal */}

      
      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="app_SignUp">
          <center>
          <img
          className="app-headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
        </center>
        <Input type="text" placeholder="Email" onChange={(e)=>setUserEmail(e.target.value)} value={userEmail}/>
        <Input type="password" placeholder="Password" onChange={(e)=>setUserPassword(e.target.value)} value={userPassword}/>
        <Button onClick={signIn} variant="text">Sign In</Button>
        </form>
        </Box>
      </Modal>
    
      
        <div className="app-header">
        <img
          className="app-headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      {user?<Button onClick={()=>auth.signOut()} variant="success">Log Out</Button>   
:(
  <div>
<Button onClick={()=>setOpen(true)} variant="success">Sign Up</Button>   
<Button onClick={()=>setOpenSignIn(true)} variant="success">Sign In</Button>

</div>
)}
         {posts.length


        ? posts.map(({id,post}) => (
            <Post
            key={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
              postUrl={post.postUrl}
            />
          ))
        : ""}
    </div>
  );
}
