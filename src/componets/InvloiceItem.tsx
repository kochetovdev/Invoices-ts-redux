import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteInvoice } from "../store/slices/invoiceSlice";
import { Invoice } from "../types/invoice";
import toast from "react-hot-toast";
import { useState } from "react";
import delay from "delay";
import Spinner from "./Spinner";

interface Props {
  invoice: Invoice;
}

const InvloiceItem = ({ invoice }: Props) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status } = useAppSelector((state) => state.invoice);

  const handleRemoveInvoice = (id: string) => async () => {
    setLoading(true);
    if (status === "failed") {
      toast("Enable delete invoices. Something went wrong");
      setLoading(false);

      return;
    }
    await delay(1000);
    dispatch(deleteInvoice(id));
    setLoading(false);
  };

  return (
    <article className="relative w-[300px] sm:w-[400px] md:w-[350px] lg:w-[300px] h-[350px] bg-lime-50 shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold uppercase text-center pt-6 mb-5">
        Invoice
      </h2>
      <div className="flex flex-col items-center mb-5">
        <p className="text-lg font-bold mb-5">
          Your number is {invoice.number}
        </p>
        <p className="text-gray-700">
          Created at{" "}
          <span className="font-semibold">{invoice.date_created}</span>
        </p>
        <p className="text-gray-700">
          Suplied at{" "}
          <span className="font-semibold">
            {!invoice.date_supplied && "XX-XX-XXXX"}
            {invoice.date_supplied}
          </span>
        </p>
      </div>
      <div className="mx-6 md:mx-4 mb-8 line-clamp-3 overflow-hidden">
        {invoice.comment}
      </div>
      <div className="absolute bottom-5 left-10 sm:left-24 md:left-16 lg:left-10 space-x-5 md:space-x-4">
        <button
          onClick={() => navigate(`${invoice.id}`)}
          className="inline-flex bg-green-500 hover:bg-amber-600 px-8 py-2 transition-colors rounded-md shadow-sm"
        >
          Edit
        </button>
        <button
          disabled={loading}
          onClick={handleRemoveInvoice(invoice.id)}
          type="button"
          className="inline-flex justify-evenly items-center bg-green-500 hover:bg-amber-600 w-24 h-10 transition-colors rounded-md shadow-sm"
        >
          <span>Delete</span>
          {loading && (
            <span>
              <Spinner />
            </span>
          )}
        </button>
      </div>
    </article>
  );
};

export default InvloiceItem;
