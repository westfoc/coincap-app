"use client";
import { env } from "../../../env";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Asset {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
}

interface AssetResponse {
  data: Readonly<Asset[]>;
  timestamp: number;
}

interface CoinState {
  coins: Asset[] | undefined;
  status: string;
}

const initialState: CoinState = {
  coins: [],
  status: "idle",
};

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoinData", // action type prefix
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://rest.coincap.io/v3/assets`, {
        method: "GET",
        headers: {
          "Content-Type": "accept: application/json",
          Authorization: `Bearer ${env.NEXT_PUBLIC_APIKEY}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue("Server error");
      }

      const assets = (await response.json()) as AssetResponse;
      const assetsData = assets.data.slice(0, 20);
      return assetsData;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  },
);

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCoins.fulfilled,
      (state: CoinState, action: PayloadAction<Asset[] | undefined>) => {
        state.status = "idle";
        state.coins = action.payload;
      },
    );
  },
});

// export const { saveCoins } = coinSlice.actions;
export default coinSlice.reducer;
