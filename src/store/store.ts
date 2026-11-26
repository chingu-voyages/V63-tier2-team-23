import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { type SupabaseClient } from "@supabase/supabase-js";

const rootReducer = combineReducers({});

export const makeStore = (supabaseClient: SupabaseClient) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            supabaseClient,
          },
        },
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
