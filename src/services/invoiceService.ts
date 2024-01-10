import { instance } from "../axios";
import { Invoice } from "../types/invoice";

enum Route {
  BASE_PATH = "/invoices",
}

export class invoiceService {
  private static basePath = Route.BASE_PATH;

  static async getInvoices() {
    return instance.get(invoiceService.basePath);
  }

  static async addNewInvoise(newInvoice: Omit<Invoice, "date_supplied">) {
    return await instance.post(invoiceService.basePath, newInvoice);
  }

  static async deleteInvoice(id: string) {
    return await instance.delete(`${invoiceService.basePath}/${id}`);
  }

  static async updateInvoice(updateInvoice: Omit<Invoice, "date_created">) {
    return await instance.patch(
      `${invoiceService.basePath}/${updateInvoice.id}`,
      updateInvoice
    );
  }
}
