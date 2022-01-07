import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

const initialState = {
  loading: false,
  error: false,
  success: false,
  errorMessage: null,
  courses: [],

  create: { loading: false, error: false, success: false, errorMessage: null },
  course: {
    loading: false,
    error: false,
    success: false,
    errorMessage: null,
    isEditMode: false,
    renderChapterForm: false,
    renderLectureForm: false,
    currChapterIndex: null,
    currChapterData: null,
    currLectureIndex: null,
    currLectureData: null,
    data: null,
  },
};

export const getPostedCourses = createAsyncThunk(
  'courses/getPostedCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/me/posted-courses`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const createCourse = createAsyncThunk(
  'courses/createCourse',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/course`, { ...data });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const fetchCourse = createAsyncThunk(
  'courses/fetchCourse',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/course/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addChapter(state, action) {
      const { data } = action.payload;
      data.content = [];
      state.course.data.curriculum.push(data);
    },
    editChapter(state, action) {
      const { data } = action.payload;
      const chapterIndex = state.course.currChapterIndex;

      const newCurriculum = state.course.data.curriculum.map(
        (chapter, index) => {
          if (index === chapterIndex) {
            chapter.chapterTitle = data.chapterTitle;
            chapter.duration = data?.duration;
          }
          return chapter;
        }
      );
      state.course.data.curriculum = newCurriculum;
      state.course.isEditMode = false;
    },
    addLecture(state, action) {
      const { data } = action.payload;
      const chapterIndex = state.course.currChapterIndex;

      const newCurriculum = state.course.data.curriculum.map(
        (chapter, index) => {
          if (index === chapterIndex) {
            chapter.content = [...chapter.content, data];
          }
          return chapter;
        }
      );
      state.course.data.curriculum = newCurriculum;
    },
    editLecture(state, action) {
      const { data } = action.payload;
      const chapterIndex = state.course.currChapterIndex;
      const lectureIndex = state.course.currLectureIndex;

      const newCurriculum = state.course.data.curriculum.map(
        (chapter, index) => {
          if (index === chapterIndex) {
            const updatedContent = chapter.content.map((item, index) => {
              if (index === lectureIndex) {
                item = data;
              }
              return item;
            });
            chapter.content = updatedContent;
          }
          return chapter;
        }
      );
      state.course.data.curriculum = newCurriculum;
      state.course.isEditMode = false;
    },
    deleteChapter(state, action) {
      const updatedCurriculum = state.course.data.curriculum.filter(
        (chapter, index) => index !== action.payload
      );
      state.course.data.curriculum = updatedCurriculum;
    },
    deleteLecture(state, action) {
      const { chapterIndex, lectureIndex } = action.payload;
      const updatedCurriculum = state.course.data.curriculum.map(
        (chapter, index) => {
          if (index === chapterIndex) {
            const updatedContent = chapter.content.filter(
              (item, index) => index !== lectureIndex
            );
            chapter.content = updatedContent;
          }
          return chapter;
        }
      );
      state.course.data.curriculum = updatedCurriculum;
    },
    setCurrChapterIndex(state, action) {
      state.course.currChapterIndex = action.payload;
    },
    setCurrChapterData(state, action) {
      state.course.currChapterData = action.payload;
    },
    setCurrLectureIndex(state, action) {
      state.course.currLectureIndex = action.payload;
    },
    setCurrLectureData(state, action) {
      state.course.currLectureData = action.payload;
    },
    setIsEditMode(state, action) {
      state.course.isEditMode = action.payload;
    },
    setRenderChapterForm(state) {
      state.course.renderChapterForm = true;
      state.course.renderLectureForm = false;
    },
    setRenderLectureForm(state) {
      state.course.renderLectureForm = true;
      state.course.renderChapterForm = false;
    },
    resetCreateState(state) {
      Object.assign(state.create, initialState.create);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostedCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostedCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.errorMessage = null;

        state.courses = action.payload;
      })
      .addCase(getPostedCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })

      .addCase(createCourse.pending, (state) => {
        state.create.loading = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.create.loading = false;
        state.create.success = true;
        state.create.error = false;
        state.create.errorMessage = null;

        state.courses = [...state.courses, action.payload];
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.create.loading = false;
        state.create.error = true;
        state.create.errorMessage = action.payload;
      })

      .addCase(fetchCourse.pending, (state) => {
        state.course.loading = true;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.course.loading = false;
        state.course.success = true;
        state.course.error = false;
        state.course.errorMessage = null;

        state.course.data = action.payload;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.course.loading = false;
        state.course.error = true;
        state.course.errorMessage = action.payload;
      });
  },
});

export const {
  addChapter,
  editChapter,
  addLecture,
  editLecture,
  deleteChapter,
  deleteLecture,
  setCurrChapterIndex,
  setCurrChapterData,
  setCurrLectureIndex,
  setCurrLectureData,
  setIsEditMode,
  setRenderChapterForm,
  setRenderLectureForm,
  resetCreateState,
} = coursesSlice.actions;

export default coursesSlice.reducer;
