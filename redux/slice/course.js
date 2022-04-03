import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

const initialState = {
  loading: false,
  error: false,
  success: false,
  errorMessage: null,
  allcourses: {
    loading: false,
    error: false,
    success: false,
    errorMessage: null,
    data: [],
  },
  categoryCourses: {
    loading: false,
    error: false,
    success: false,
    errorMessage: null,
    data: {},
  },
  courses: [],

  create: { loading: false, error: false, success: false, errorMessage: null },
  course: {
    fetch: { loading: false, error: false, success: false, errorMessage: null },
    update: {
      loading: false,
      error: false,
      success: false,
      errorMessage: null,
    },
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

export const getAllCourses = createAsyncThunk(
  'courses/getAllCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/all-courses`);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const getCategoryCourses = createAsyncThunk(
  'courses/getCategoryCourses',
  async ({ query, stateName, category, subCategory }, { rejectWithValue }) => {
    try {
      let response;
      if (query) {
        response = await axios.get(`${API}/courses?query=${query}`);
      } else {
        if (category && !subCategory) {
          response = await axios.get(`${API}/courses?category=${category}`);
        }
        if (category && subCategory) {
          response = await axios.get(
            `${API}/courses?category=${category}&subCategory=${subCategory}`
          );
        }
        if (!category && subCategory) {
          response = await axios.get(
            `${API}/courses?subCategory=${subCategory}`
          );
        }
      }

      return { stateName, data: response.data };
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

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
      const response = await axios.post(`${API}/create-course`, { ...data });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const updateCourse = createAsyncThunk(
  'courses/updateCourse',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API}/course/${data._id}`, {
        ...data,
      });
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
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/get-course`, { ...payload });
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
      .addCase(getAllCourses.pending, (state) => {
        state.allcourses.loading = true;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.allcourses.loading = false;
        state.allcourses.success = true;
        state.allcourses.error = false;
        state.allcourses.errorMessage = null;

        state.allcourses.data = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.allcourses.loading = false;
        state.allcourses.error = true;
        state.allcourses.errorMessage = action.payload;
      })

      .addCase(getCategoryCourses.pending, (state, action) => {
        const { stateName } = action.meta.arg;
        state.categoryCourses[stateName] = {};
        state.categoryCourses[stateName].loading = true;
        state.categoryCourses[stateName].error = false;
      })
      .addCase(getCategoryCourses.fulfilled, (state, action) => {
        const { stateName, data } = action.payload;

        state.categoryCourses[stateName].loading = false;
        state.categoryCourses[stateName].success = true;
        state.categoryCourses[stateName].error = false;
        state.categoryCourses[stateName] = {
          ...state.categoryCourses[stateName],
          ...data,
        };
      })
      .addCase(getCategoryCourses.rejected, (state, action) => {
        const { stateName } = action.meta.arg;

        state.categoryCourses[stateName].loading = false;
        state.categoryCourses[stateName].success = false;
        state.categoryCourses[stateName].error = true;
      })

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
        state.course.fetch.loading = true;
      })
      .addCase(fetchCourse.fulfilled, (state, action) => {
        state.course.fetch.loading = false;
        state.course.fetch.success = true;
        state.course.fetch.error = false;
        state.course.fetch.errorMessage = null;

        state.course.data = action.payload;
      })
      .addCase(fetchCourse.rejected, (state, action) => {
        state.course.fetch.loading = false;
        state.course.fetch.error = true;
        state.course.fetch.errorMessage = action.payload;
      })

      .addCase(updateCourse.pending, (state) => {
        state.course.update.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.course.update.loading = false;
        state.course.update.success = true;
        state.course.update.error = false;
        state.course.update.errorMessage = null;

        state.course.data = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.course.update.loading = false;
        state.course.update.error = true;
        state.course.update.errorMessage = action.payload;
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
