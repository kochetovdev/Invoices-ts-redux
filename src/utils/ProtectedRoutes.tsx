import InvoicesList  from "../pages/InvoicesList";
import InvoiceCreateItem  from "../componets/InvoiceCreateItem";
import  InvoicesDetails  from "../componets/InvoicesDetails";

export const pathes = [
  {
    path: "/invoices",
    element: <InvoicesList />,
  },
  {
    path: "invoices/create",
    element: <InvoiceCreateItem />,
  },
  {
    path: "/invoices/:id",
    element: <InvoicesDetails />,
  },
];
