import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import rf from 'src/services/RequestFactory';

interface IMetadataCurrencies {
  address: string;
  confirmations: number;
  decimals: number;
  id: number;
  networkId: number;
  refSymbol: string;
  symbol: string;
  icon: string;
  coingeckoId: string;
}

export type MetadataState = {
  currencies: IMetadataCurrencies[];
};

const initialState: MetadataState = {
  currencies: [],
};

export const getMetadataCurrencies = createAsyncThunk(
  'metadata/getCurrencies',
  async (_params, thunkApi) => {
    const res = await rf.getRequest('MarketDataRequest').getAllCurrency();
    thunkApi.dispatch(setCurrencies(res.data));
  },
);

export const initMetadata = createAsyncThunk(
  'metadata/init',
  async (_params, thunkApi) => {
    await Promise.all([thunkApi.dispatch(getMetadataCurrencies())]);
  },
);

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    setCurrencies: (state, action: PayloadAction<IMetadataCurrencies[]>) => {
      state.currencies = action.payload;
    },
  },
});

export const { setCurrencies } = metadataSlice.actions;

export default metadataSlice.reducer;
