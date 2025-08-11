// authWithGoogle.js
import { auth, db, GithubProvider, GoogleProvider } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, GoogleProvider);
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

    const returnedUser = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      // photoURL: user.photoURL
    }

    return {
      returnedUser,
      message: "Login Successful"
    };

  } catch (error) {
    console.error("Gagal login:", error);
    throw error;
  }
}

export async function loginWithGithub() {
  try {
    const result = await signInWithPopup(auth, GithubProvider);
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
    const returnedUser = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      // photoURL: user.photoURL
    }

    return {
      returnedUser,
      message: "Login Successful"
    };
  } catch (error) {
    console.error("Gagal login:", error);
    throw error;
  }
}


export async function NormalLogin(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User not found");
    }

    const returnedUser = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      // photoURL: user.photoURL
    }

    return {
      returnedUser,
      message: "Login Successful"
    };
  } catch (error) {
    console.error("Gagal login:", error);
    throw error;
  }
}


export async function Register(email: string, password: string, namaLengkap: string, nomor: string) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const userRef = doc(db, "users", user.uid);
  const nameParts = namaLengkap.split(" ");
  const photoURL = `https://avatar.iran.liara.run/username?username=[${nameParts.join("+")}]`;

  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    throw new Error("User already exists");
  }

  await setDoc(userRef, {
    name: namaLengkap,
    email: email,
    phone: nomor,
    role: "user",  // default role
    photoURL: photoURL
  });

  const returnedUser = {
    uid: user.uid,
    email: user.email,
    name: namaLengkap,
    // photoURL: user.photoURL
  }

  return {
    returnedUser,
    message: "Register Successful"
  };
}

async function SetRole(userId: string, role: Role) {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, { role }, { merge: true });
    console.log("Role berhasil diupdate");
  } catch (error) {
    console.error("Gagal update role:", error);
    throw error;
  }
}
