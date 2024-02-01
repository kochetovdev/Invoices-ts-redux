import { useEffect } from "react";
import InvloiceItem from "../componets/InvloiceItem";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchInvoices } from "../store/slices/invoiceSlice";
import SkeletonInvoices from "../skeletons/SkeletonInvoices";
import InvoicesPanel from "../componets/InvoicesPanel";

const InvoicesList = () => {
  const dispatch = useAppDispatch();
  const { invoices, status, error } = useAppSelector((state) => state.invoice);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  return (
    <article className="max-w-[1400px] pb-20">
      <InvoicesPanel />
      {invoices.length === 0 && status !== "pending" && (
        <h2 className="font-semibold text-2xl flex justify-center pb-6">
          There are no Invoices yet
        </h2>
      )}
      <div className="grid justify-items-center mx-6 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {!error &&
          status === "pending" &&
          Array.from({ length: 4 }, (_, index) => <SkeletonInvoices key={index} />)}
        {(error as string) && (
          <div>An error occurred error{error as string}</div>
        )}
        {status !== "pending" &&
          invoices.map((invoice) => (
            <InvloiceItem key={invoice.id} invoice={invoice} />
          ))}
      </div>
    </article>
  );
};

export default InvoicesList;
