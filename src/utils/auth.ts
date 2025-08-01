// authWithGoogle.js
import { auth, db, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // User baru → simpan data user + role default
      await setDoc(userRef, {
        name: user.displayName || "",
        email: user.email,
        phone: user.phoneNumber || "",
        role: "user",  // default role
        photoURL: user.photoURL || ""
      });
    }

    console.log("Login berhasil");
    return user;

  } catch (error) {
    console.error("Gagal login:", error);
    throw error;
  }
}

// export async function NormalLogin(){
//     try {
        
//     }
// }
