import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Invoice } from "../../types/invoice";
import delay from "delay";
import { formattedDate, idGenerator } from "../../utils";
import { invoiceService } from "../../services/invoiceService";

export const fetchInvoices = createAsyncThunk(
  "invoice/fetchInvoice",
  async function (_, { rejectWithValue }) {
    try {
      await delay(1000);
      const res = await invoiceService.getInvoices();
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
        id: idGenerator(),
        date_created: formattedDate,
        number: Number(invoiceData.number),
        comment: invoiceData.comment,
      };
      const res = await invoiceService.addNewInvoise(newInvoice);

      if (res.status !== 200) {
        throw new Error("Can't add invoices. Server Error.");
      }

      dispatch(createInvoice(invoiceData));
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoice/deleteInvoice",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const res = await invoiceService.deleteInvoice(id);
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
      const updateInvoice = {
        id: targetInvoice.id,
        number: targetInvoice.number,
        comment: targetInvoice.comment,
        date_supplied: formattedDate,
      };
      const res = await invoiceService.updateInvoice(updateInvoice)
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
      state.invoices.push(payload);
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

export const { removeInvoice, updateInvoiceSync, createInvoice } =
  invoiceSlice.actions;

export default invoiceSlice.reducer;
