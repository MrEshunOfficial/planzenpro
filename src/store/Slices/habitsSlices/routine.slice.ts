import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RoutineFormData, RoutineState } from "@/store/types";
import { RootState } from "@/store";
import Routine, { RoutineDocument } from "@/models/routine.model";

export const fetchRoutines = createAsyncThunk(
  "routines/fetchRoutines",
  async (_, { rejectWithValue }) => {
    try {
      const routines = await Routine.find().exec();
      return routines;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createRoutine = createAsyncThunk(
  "routines/createRoutine",
  async (data: RoutineFormData, { rejectWithValue }) => {
    try {
      const newRoutine = new Routine(data);
      await newRoutine.save();
      return newRoutine;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateRoutine = createAsyncThunk(
  "routines/updateRoutine",
  async (data: RoutineFormData, { rejectWithValue }) => {
    try {
      const { _id, ...updatedData } = data;
      const updatedRoutine = await Routine.findByIdAndUpdate(_id, updatedData, {
        new: true,
      });
      if (!updatedRoutine) {
        return rejectWithValue("Routine not found");
      }
      return updatedRoutine;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteRoutine = createAsyncThunk(
  "routines/deleteRoutine",
  async (id: string, { rejectWithValue }) => {
    try {
      const deletedRoutine = await Routine.findByIdAndDelete(id);
      if (!deletedRoutine) {
        return rejectWithValue("Routine not found");
      }
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const routineSlice = createSlice({
  name: "routines",
  initialState: {
    routines: [],
    status: "idle",
    error: null,
  } as RoutineState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutines.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchRoutines.fulfilled,
        (state, action: PayloadAction<RoutineDocument[]>) => {
          state.status = "succeeded";
          state.routines = action.payload;
        }
      )
      .addCase(fetchRoutines.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createRoutine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createRoutine.fulfilled,
        (state, action: PayloadAction<RoutineDocument>) => {
          state.status = "succeeded";
          state.routines.push(action.payload);
        }
      )
      .addCase(createRoutine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateRoutine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateRoutine.fulfilled,
        (state, action: PayloadAction<RoutineDocument>) => {
          state.status = "succeeded";
          const index = state.routines.findIndex(
            (routine) => routine._id === action.payload._id
          );
          if (index !== -1) {
            state.routines[index] = action.payload;
          }
        }
      )
      .addCase(updateRoutine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteRoutine.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteRoutine.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.routines = state.routines.filter(
            (routine) => routine._id !== action.payload
          );
        }
      )
      .addCase(deleteRoutine.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const selectRoutines = (state: RootState) => state.routines.routines;
export const selectRoutineStatus = (state: RootState) => state.routines.status;
export const selectRoutineError = (state: RootState) => state.routines.error;

export default routineSlice.reducer;
