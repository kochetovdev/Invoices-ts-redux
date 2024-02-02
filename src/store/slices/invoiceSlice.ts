import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Invoice } from "../../types/invoice";
import { formattedDate } from "../../utils";
import { invoiceService } from "../../services/invoiceService";

export const fetchInvoices = createAsyncThunk(
  "invoice/fetchInvoice",
  async function (_, { rejectWithValue }) {
    try {
      const res = await invoiceService.getInvoices();

      return res;
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
        date_created: formattedDate(),
        number: Number(invoiceData.number),
        comment: invoiceData.comment,
      };
      await invoiceService.addNewInvoise(newInvoice);

      const invoices = await invoiceService.getInvoices();

      dispatch(createInvoice(invoices));
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "invoice/updateInvoice",
  async (targetInvoice: Invoice, { rejectWithValue, dispatch }) => {
    try {
      const updateInvoice: Invoice = {
        id: targetInvoice.id,
        number: targetInvoice.number,
        comment: targetInvoice.comment,
        date_supplied: formattedDate(),
      };
      await invoiceService.updateInvoice(updateInvoice);

      dispatch(updateInvoiceSync(targetInvoice));
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const deleteInvoice = createAsyncThunk(
  "invoice/deleteInvoice",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await invoiceService.deleteInvoice(id);

      dispatch(removeInvoice(id));
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
    createInvoice(state, { payload }: PayloadAction<Invoice[]>) {
      state.invoices = payload;
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
