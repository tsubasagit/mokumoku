import {
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously as firebaseSignInAnonymously,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./client";

const AVATAR_COLORS = [
  "#7EB8DA", "#FFB6C1", "#FFD93D", "#A8D8A8",
  "#DDA0DD", "#F0E68C", "#87CEEB", "#FFA07A",
];

function randomColor(): string {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  await setDoc(doc(db, "users", user.uid), {
    displayName: user.displayName || "ユーザー",
    avatarColor: randomColor(),
    isAnonymous: false,
    photoURL: user.photoURL || null,
  }, { merge: true });

  return user;
}

export async function signInAnonymously(nickname: string) {
  const result = await firebaseSignInAnonymously(auth);
  const user = result.user;

  await updateProfile(user, { displayName: nickname });

  await setDoc(doc(db, "users", user.uid), {
    displayName: nickname,
    avatarColor: randomColor(),
    isAnonymous: true,
  }, { merge: true });

  return user;
}

export async function signOut() {
  await firebaseSignOut(auth);
}
