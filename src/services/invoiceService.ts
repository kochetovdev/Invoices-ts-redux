import { instance } from "../axios";
import { Invoice } from "../types/invoice";

enum Route {
  BASE_PATH = "/invoices",
}

export class invoiceService {
  private static basePath = Route.BASE_PATH;

  static async getInvoices() {
    try {
      return instance.get(invoiceService.basePath);
    } catch (error) {
      throw error;
    }
  }

  static async addNewInvoise(newInvoice: Omit<Invoice, "date_supplied">) {
    try {
      return await instance.post(invoiceService.basePath, newInvoice);
    } catch (error) {
      throw error;
    }
  }

  static async deleteInvoice(id: string) {
    try {
      return await instance.delete(`${invoiceService.basePath}/${id}`);
    } catch (error) {
      throw error;
    }
  }

  static async updateInvoice(updateInvoice: Omit<Invoice, "date_created">) {
    try {
      return await instance.patch(
        `${invoiceService.basePath}/${updateInvoice.id}`,
        updateInvoice
      );
    } catch (error) {
      throw error;
    }
  }
}
