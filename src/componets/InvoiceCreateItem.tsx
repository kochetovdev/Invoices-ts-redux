import { useForm } from "react-hook-form";
import { Invoice } from "../types/invoice";
import { useAppDispatch } from "../store/hooks";
import { addNewInvoice } from "../store/slices/invoiceSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import delay from "delay";
import SkeletonInvoicesDetails from "../skeletons/SkeletonInvoicesDetails";
import toast from "react-hot-toast";
import ErrorMessage from "./ErrorMessage";

const InvoiceCreateItem = () => {
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Invoice>();

  const onSubmit = handleSubmit(async (invoiceData) => {
    try {
      setLoading(true);
      if (!invoiceData.comment.trim()) {
        toast(
          "A comment should consist of more than just whitespace characters"
        );
        return;
      }
      await delay(1000);
      dispatch(addNewInvoice(invoiceData));

      navigate("/invoices");
    } catch (error) {
      console.error("An error occurred:", error);
      toast("An error occurred while creating the invoice.");
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    setShowSkeleton(true);
    const timeout = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (showSkeleton) {
    return <SkeletonInvoicesDetails create={true} />;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col bg-gray-100 rounded-md shadow-xl"
    >
      <h2 className="text-2xl font-semibold uppercase text-center pt-6 mb-5">
        Invoice
      </h2>
      <div className="flex flex-col items-center mb-5">
        <div className="text-lg mb-5 flex flex-col items-center justify-center md:flex-row">
          <label htmlFor="number" className="mb-1 md:mr-2">
            Your number is
          </label>
          <div className="flex flex-col items-center justify-center md:flex-row">
            <input
              {...register("number", {
                required: "This field is required",
                pattern: {
                  value: /^\d*$/,
                  message: "Please enter only numbers",
                },
              })}
              id="number"
              type="text"
              className="mr-2 font-bold outline-none ring-1 ring-red-200 px-2 py-1 rounded-sm md:text-center max-w-[120px] text-center"
            />
            <div className="mt-1">
              <ErrorMessage>{errors.number?.message}</ErrorMessage>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-5">
          <p className="text-gray-700">
            Created at - <span className="font-semibold"></span>
          </p>
          <p className="text-gray-700">
            Suplied at - <span className="font-semibold"></span>
          </p>
        </div>
      </div>
      <div className="space-y-2 mb-5 flex flex-col xl:space-y-0 xl:flex-row justify-around items-center">
        <textarea
          {...register("comment", { required: "This field is required" })}
          id="comment"
          className="mx-auto w-[300px] sm:w-[500px] lg:w-[800px] flex md:mx-4 xl:mb-0 p-2 outline-none ring-1 ring-red-200 rounded-sm"
        />
        <div className="mt-1">
          <ErrorMessage>{errors.comment?.message}</ErrorMessage>
        </div>
        <div className="flex items-center">
          <button
            disabled={loading}
            type="submit"
            className="inline-flex justify-evenly items-center mt-5 xl:mt-0 bg-green-500 hover:bg-amber-600 w-32 h-10 transition-colors rounded-md shadow-sm disabled:bg-gray-400"
          >
            <span>Create</span>
            {loading && (
              <span>
                <Spinner />
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default InvoiceCreateItem;
