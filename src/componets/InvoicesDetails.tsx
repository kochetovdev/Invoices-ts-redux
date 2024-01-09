import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useForm } from "react-hook-form";
import { deleteInvoice, updateInvoice } from "../store/slices/invoiceSlice";
import { Invoice } from "../types/invoice";
import toast from "react-hot-toast";
import delay from "delay";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import SkeletonInvoicesDetails from "../skeletons/SkeletonInvoicesDetails";

const InvoicesDetails = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const dispatch = useAppDispatch();
  const { invoices, status } = useAppSelector((state) => state.invoice);
  const { id } = useParams();
  const navigate = useNavigate();

  const invoice = invoices.find((invoce) => invoce.id === id);

  const { register, handleSubmit } = useForm<Invoice>({
    defaultValues: {
      id: invoice?.id,
      date_created: invoice?.date_created,
      date_supplied: invoice?.date_supplied,
    },
  });

  const onSumbit = handleSubmit(async (invoiceData) => {
    try {
      setLoading(true);

      const number = Number(invoiceData.number) === invoice?.number;
      const comment = invoiceData.comment === invoice?.comment;

      if (number && comment) {
        setLoading(false);
        toast("The data has not been changed");

        return;
      }
  
      dispatch(updateInvoice(invoiceData));
      await delay(1000);

      navigate("/invoices");
    } catch (error) {
      console.error("An error occurred:", error);
      toast("An error occurred while creating the invoice.");
    } finally {
      setLoading(false);
    }
  });

  const handleRemoveInvoice = (id: string) => async () => {
    setDeleteLoading(true);
    if (status === "failed") {
      toast("Enable delete invoices. Something went wrong");
      setLoading(false);
      return;
    }
    await delay(1000);
    dispatch(deleteInvoice(id));
    setDeleteLoading(false);
    navigate("/invoices");
  };

  useEffect(() => {
    setShowSkeleton(true);
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (showSkeleton) {
    return <SkeletonInvoicesDetails />;
  }

  return (
    <>
      {invoice && (
        <form
          onSubmit={onSumbit}
          className="flex flex-col bg-gray-100 rounded-md shadow-xl"
        >
          <h2 className="text-2xl font-semibold uppercase text-center pt-6 mb-5">
            Invoice
          </h2>
          <div className="flex flex-col items-center mb-5">
            <div className="text-lg mb-5 flex flex-col items-center md:flex-row">
              <label htmlFor="number" className="mb-1 md:mr-2">
                Your number is
              </label>
              <input
                {...register("number")}
                id="number"
                type="text"
                defaultValue={invoice.number}
                className="font-bold outline-none ring-1 ring-red-200 px-2 py-1 rounded-sm text-center max-w-[120px]"
              />
            </div>
            <div className="flex flex-col items-center mb-5">
              <p className="text-gray-700">
                Created at -{" "}
                <span className="font-semibold">{invoice.date_created}</span>
              </p>
              <p className="text-gray-700">
                Suplied at -{" "}
                <span className="font-semibold">
                  {invoice.date_supplied}
                  {!invoice.date_supplied && "XX-XX-XXXX"}
                </span>
              </p>
            </div>
          </div>
          <div className="md:space-x-8 mb-5 flex flex-col xl:flex-row justify-around items-center">
            <textarea
              {...register("comment")}
              defaultValue={invoice.comment}
              id="comment"
              className="mx-auto w-[300px] sm:w-[500px] lg:w-[800px] flex mb-8 md:mx-4 xl:mb-0 p-2 outline-none ring-1 ring-red-200 rounded-sm"
            ></textarea>
            <div className="space-x-8">
              <button
                type="submit"
                disabled={loading || deleteLoading}
                className="inline-flex justify-evenly items-center w-24 h-10 bg-green-500 hover:bg-amber-600 transition-colors rounded-md shadow-sm disabled:bg-gray-400"
              >
                <span>Apply</span>
                {loading && (
                  <span>
                    <Spinner />
                  </span>
                )}
              </button>
              <button
                disabled={loading || deleteLoading}
                onClick={handleRemoveInvoice(invoice.id)}
                className="inline-flex justify-evenly items-center w-24 h-10 bg-green-500 hover:bg-amber-600 transition-colors rounded-md shadow-sm disabled:bg-gray-400"
              >
                <span>Delete</span>
                {deleteLoading && (
                  <span>
                    <Spinner />
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default InvoicesDetails;
