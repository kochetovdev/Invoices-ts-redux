import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { Invoice } from "../types/invoice";
import { db } from "../firebase";
import { firebaseLooper } from "../utils";

export class invoiceService {
  static async getInvoices() {
    try {
      const invoicesCollection = collection(db, "invoices");
      const invoicesQuery = query(
        invoicesCollection,
        orderBy("date_created", "asc")
      );
      const snapshot = await getDocs(invoicesQuery);
      const invoicesList = firebaseLooper(snapshot) as Invoice[];

      return invoicesList;
    } catch (error) {
      throw error;
    }
  }

  static async addNewInvoise(newInvoice: Omit<Invoice, "id">) {
    try {
      const createInvoiceResponse = await addDoc(
        collection(db, "invoices"),
        newInvoice
      );

      return createInvoiceResponse;
    } catch (error) {
      throw error;
    }
  }

  static async updateInvoice(updateInvoice: Invoice) {
    try {
      const invoiceDocRef = doc(db, "invoices", updateInvoice.id);
      const updateInvoiceResponse = await updateDoc(invoiceDocRef, {
        ...updateInvoice,
      });

      return updateInvoiceResponse;
    } catch (error) {
      throw error;
    }
  }

  static async deleteInvoice(id: string) {
    try {
      const deleteInvoceResponse = await deleteDoc(doc(db, "invoices", id));

      return deleteInvoceResponse;
    } catch (error) {
      throw error;
    }
  }
}

// enum Route {
//   BASE_PATH = "/invoices",
// }

// export class invoiceService {
//   private static basePath = Route.BASE_PATH;

//   static async getInvoices() {
//     try {
//       return instance.get(invoiceService.basePath);
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async addNewInvoise(newInvoice: Omit<Invoice, "date_supplied">) {
//     try {
//       return await instance.post(invoiceService.basePath, newInvoice);
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async deleteInvoice(id: string) {
//     try {
//       return await instance.delete(`${invoiceService.basePath}/${id}`);
//     } catch (error) {
//       throw error;
//     }
//   }

//   static async updateInvoice(updateInvoice: Omit<Invoice, "date_created">) {
//     try {
//       return await instance.patch(
//         `${invoiceService.basePath}/${updateInvoice.id}`,
//         updateInvoice
//       );
//     } catch (error) {
//       throw error;
//     }
//   }
// }
