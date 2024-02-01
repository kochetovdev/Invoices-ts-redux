import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";

export interface FirebaseData {
  id: string;
  [key: string]: any;
}

export function firebaseLooper(snapshot: QuerySnapshot): FirebaseData[] {
  return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
    id: doc.id,
    ...doc.data(),
  })) as FirebaseData[];
}