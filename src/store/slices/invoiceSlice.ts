import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Invoice } from "../../types/invoice";
import axios from "axios";
import delay from "delay";
import { formattedDate } from "../../utils";
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = "http://localhost:3000";

export const fetchInvoices = createAsyncThunk(
  "invoice/fetchInvoice",
  async function (_, { rejectWithValue }) {
    try {
      await delay(1000);
      const res = await axios.get(`${BASE_URL}/invoices`);
      if (res.status !== 200) {
        throw new Error("Server Error!");
      }

      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const addNewInvoice = createAsyncThunk(
  "invoice/createInvoice",
  async function (invoiceData: Invoice, { rejectWithValue, dispatch }) {
    try {
      const newInvoice = {
        id: uuidv4,
        date_created: formattedDate,
        number: Number(invoiceData.number),
        comment: invoiceData.comment,
      };
      const res = await axios.post(`${BASE_URL}/invoices`, newInvoice);

      if (res.status !== 200) {
        throw new Error("Can't add invoices. Server Error.");
      }

      dispatch(createInvoice(invoiceData))
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoice/deleteInvoice",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/invoices/${id}`, {
        method: "DELETE",
      });
      if (res.status !== 200) {
        throw new Error("Can't delete invoices. Server Error.");
      }
      dispatch(removeInvoice(id));
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "invoice/updateInvoice",
  async (targetInvoice: Invoice, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/invoices/${targetInvoice.id}`,
        {
          number: targetInvoice.number,
          comment: targetInvoice.comment,
          date_supplied: formattedDate,
        }
      );
      if (res.status !== 200) {
        throw new Error("Can't update invoices. Server Error.");
      }
      dispatch(updateInvoiceSync(targetInvoice));
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

interface StateOption {
  invoices: Invoice[];
  status: string | null;
  error: string | null;
}

const initialState: StateOption = {
  invoices: [],
  status: null,
  error: "",
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    removeInvoice(state, { payload }: PayloadAction<string>) {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== payload
      );
    },
    updateInvoiceSync(state, { payload }: PayloadAction<Invoice>) {
      state.invoices = state.invoices.map((invoice) =>
        invoice.id === payload.id ? payload : invoice
      );
    },
    createInvoice(state, { payload }: PayloadAction<Invoice>) {
      state.invoices.push(payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInvoices.pending, (state) => {
      (state.status = "pending"), (state.error = null);
    });
    builder.addCase(fetchInvoices.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.invoices = payload;
    });
    builder.addCase(fetchInvoices.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload as string;
    });
    builder.addCase(deleteInvoice.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload as string;
    });
    builder.addCase(updateInvoice.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload as string;
    });
  },
});

export const { removeInvoice, updateInvoiceSync, createInvoice } = invoiceSlice.actions;

export default invoiceSlice.reducer;
