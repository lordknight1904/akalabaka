// Import Actions
import { ACTIONS } from './AppActions';
import cuid from 'cuid';
import update from 'react-addons-update';
import {REHYDRATE} from 'redux-persist/constants'

// Initial State
const initialState = {
  isError: false,
  errorMessage: '',

  id: '',
  name: '',
  token: '',
  email: '',
  imgUrl: '',
  socialId: '',

  about: '',
  gender: '',
  yearOfBirth: '',
  nationality: '',

  isStudent: false,
  reading: '',
  writing: '',
  listening: '',
  speaking: '',

  avatarUrl: '',
  bannerUrl: '',

  teachingAbility: false,
  jobHistory: [],

  likes: [],
  follows: [],
  chatSocketIO: {},

  isFee: false,
  fee: 0,
  address: {},

  cities: [],
  districts: [],

  districts2: [],

  chatList: [],
  selectedCuid: '',

  search: [],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      const incoming = action.payload.app;
      return {...state};
    case ACTIONS.LIKED: {
      const index = state.search.findIndex((s) => {
        return s._id === action.liked.userId;
      });
      return update(state, {
        search: {
          [index]: {
            likes: {$set: action.liked.likes},
          },
        },
      });
    }
    case ACTIONS.FOLLOWED: {
      const index = state.search.findIndex((s) => {
        return s._id === action.followed.userId;
      });
      return update(state, {
        search: {
          [index]: {
            follows: {$set: action.followed.follows},
          },
        },
      });
    }
    case ACTIONS.SEARCH_RESULTS:
      return {
        ...state,
        search: action.user,
      };
    case ACTIONS.SELECT_CUID:
      return {
        ...state,
        selectedCuid: action.cuid,
      };
    case ACTIONS.READ_CHAT: {
      let index = state.chatList.findIndex( (cl) => {
        return cl.cuid === action.read;
      });
      const updatedList = state.chatList[index];
      updatedList.messages.map((mess) => {
        mess.new = false;
        return mess;
      });
      return update(state, {
        chatList: {
          [index]: { $set: updatedList}
        },
      });
    }
    case ACTIONS.ADD_NEW_CHAT: {
      let index = state.chatList.findIndex( (cl) => {
        return cl.members.length < 3 && cl.members.findIndex((mem) => mem.id == action.user.id) >= 0;
      });
      if (index < 0) {
        const newChat = {
          cuid: cuid(),
          members: [
            {
              _id: action.user._id,
              name: action.user.name,
              avatarUrl: action.user.avatarUrl,
            },
            {
              _id: action.user._id2,
              name: action.user.name2,
              avatarUrl: action.user.avatarUrl2,
            }
          ],
          messages: [],
        };
        return {
          ...state,
          chatList: [...state.chatList, newChat],
        };
      }
      return { ...state};
    }
    case ACTIONS.ADD_CHAT: {
      let index = state.chatList.findIndex( (cl) => {
        return cl.cuid === action.message.cuid;
      });
      if (index > -1) {
        const addMessage = {
          userSend: action.message.userSend,
          message: action.message.message,
          new: (action.message.userSend !== state.id && state.selectedCuid !== action.message.cuid),
        };
        return update(state, {
          chatList: {
            [index]: {
              messages: { $push: [addMessage] },
            },
          },
        });
      } else {
        const message = {
          userSend: action.message.userSend,
          message: action.message.message,
          new: (action.message.userSend !== state.id && state.selectedCuid !== action.message.cuid),
        };
        const newChat = {
          cuid: action.message.cuid,
          members: action.message.members,
          messages: [
            message
          ],
        };
        return {
          ...state,
          chatList: [...state.chatList, newChat],
        };
      }
    }
    case ACTIONS.LOG_OUT:
      return {
        ...state,
        id: '',
        name: '',
        token: '',
        email: '',
        imgUrl: '',
        socialId: '',

        about: '',
        gender: '',
        yearOfBirth: '',
        nationality: '',
        isStudent: false,
        reading: '',
        writing: '',
        listening: '',
        speaking: '',
        teachingAbility: false,
        jobHistory: [],
        likes: [],
        follows: [],
        avatarUrl: '',
        bannerUrl: '',

        isFee: false,
        fee: 0,
        address: {},
        chatList: [],
      };

    case ACTIONS.LOGIN_SUCCEED:
      return {
        ...state,
          id: action.user.id,
          name: action.user.name,
          token: action.user.token,
          email: action.user.email,
          imgUrl: action.user.imgUrl ? action.user.imgUrl : '',
          socialId: action.user.socialId ? action.user.socialId : '',
          about: action.user.about ? action.user.about : '',
          gender: action.user.gender ? action.user.gender : '',
          yearOfBirth: action.user.yearOfBirth ? action.user.yearOfBirth : '',
          nationality: action.user.nationality ? action.user.nationality : '',
          isStudent: action.user.isStudent ? action.user.isStudent : false,
          reading: action.user.reading ? action.user.reading : '',
          writing: action.user.writing ? action.user.writing : '',
          listening: action.user.listening ? action.user.listening : '',
          speaking: action.user.speaking ? action.user.speaking : '',
          teachingAbility: action.user.teachingAbility ? action.user.teachingAbility : false,
          jobHistory: action.user.jobHistory ? action.user.jobHistory : [],
          likes: action.user.likes ? action.user.likes : [],
          follows: action.user.follows ? action.user.follows : [],
          liked: action.user.liked ? action.user.liked : [],
          followed: action.user.followed ? action.user.followed : [],
          avatarUrl: action.user.avatarUrl ? action.user.avatarUrl : '',
          bannerUrl: action.user.bannerUrl ? action.user.bannerUrl : '',
          isFee: action.user.isFee ? action.user.isFee : false,
          fee: action.user.fee ? action.user.fee : 0,
          address: action.user.address ? action.user.address : {},
          chatList: action.user.chatHistory ? action.user.chatHistory : {},
      };
    case ACTIONS.SIGNUP_SUCCEED:
      return {
        ...state,
        id: action.user.id,
        name: action.user.name,
        token: action.user.token,
        email: action.user.email,
        imgUrl: '',
        socialId: '',
        about: '',
        gender: '',
        yearOfBirth: '',
        nationality: '',
        isStudent: false,
        reading: '',
        writing: '',
        listening: '',
        speaking: '',
        teachingAbility: false,
        jobHistory: [],
        likes: [],
        follows: [],
        avatarUrl: '',
        bannerUrl: '',
        isFee: false,
        fee: 0,
        address: {},
        chatList: [],
      };
    case ACTIONS.APP_ERROR:
      return {
        ...state,
        isError: true,
        errorMessage: action.message,
      };
    case ACTIONS.JOB_HISTORY_UPDATED:
      return {
        ...state,
        jobHistory: action.jobHistory,
      };
    case ACTIONS.ABOUT_UPDATED:
      return {
        ...state,
        about: action.about,
      };
    case ACTIONS.STUDENT_UPDATED:
      return {
        ...state,
        isStudent: action.isStudent,
      };
    case ACTIONS.TEACHING_UPDATED:
      return {
        ...state,
        teachingAbility: action.teachingAbility,
      };
      return {...state};
    case ACTIONS.YEAR_OF_BIRTH_UPDATED:
      return {
        ...state,
        yearOfBirth: action.yearOfBirth,
      };
      return {...state};
    case ACTIONS.NAME_UPDATED:
      return {
        ...state,
        name: action.name,
      };
      return {...state};
    case ACTIONS.NATIONALITY_UPDATED:
      return {
        ...state,
        nationality: action.nationality,
      };
      return {...state};
    case ACTIONS.GENDER_UPDATED:
      return {
        ...state,
        gender: action.gender,
      };
    case ACTIONS.ADDRESS_UPDATED:
      return {
        ...state,
        address: action.address,
      };
    case ACTIONS.FEE_UPDATED:
      return {
        ...state,
        isFee: action.fee.isFee,
        fee: action.fee.fee,
      };
    case ACTIONS.MARKS_UPDATED:
      return {
        ...state,
        reading: action.marks.reading,
        listening: action.marks.listening,
        writing: action.marks.writing,
        speaking: action.marks.speaking,
      };
    case ACTIONS.BANNER_URL:
      return {
        ...state,
        bannerUrl: action.bannerUrl,
      };
    case ACTIONS.AVATAR_URL:
      return {
        ...state,
        avatarUrl: action.avatarUrl,
      };
    case ACTIONS.SET_CHAT_SOCKET:
      return {
        ...state,
        chatSocketIO: action.chatSocketIO,
      };
    case ACTIONS.ADD_CITIES:
      return {
        ...state,
        cities: action.cities,
      };
    case ACTIONS.ADD_DISTRICTS:
      return {
        ...state,
        districts: action.districts,
      };
    case ACTIONS.ADD_DISTRICTS2:
      return {
        ...state,
        districts2: action.districts,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getId = state => state.app.id;
export const getName = state => state.app.name;
export const getToken = state => state.app.token;
export const getEmail = state => state.app.email;
export const getImgUrl = state => state.app.imgUrl;
export const getSocialId= state => state.app.socialId;

export const getAbout= state => state.app.about;
export const getGender= state => state.app.gender;
export const getYearOfBirth= state => state.app.yearOfBirth;
export const getNationality= state => state.app.nationality;
export const getIsStudent= state => state.app.isStudent;
export const getIsFee = state => state.app.isFee;
export const getFee = state => state.app.fee;
export const getAddress= state => state.app.address;
export const getReading= state => state.app.reading;
export const getListening= state => state.app.listening;
export const getWriting= state => state.app.writing;
export const getSpeaking= state => state.app.speaking;
export const getTeachingAbility= state => state.app.teachingAbility;
export const getJobHistory= state => state.app.jobHistory;
export const getLikes= state => state.app.likes;
export const getFollow= state => state.app.follows;
export const getLiked = state => state.app.liked;
export const getFollowed = state => state.app.followed;

export const getBannerUrl= state => state.app.bannerUrl;
export const getAvatarUrl= state => state.app.avatarUrl;
export const getChatSocket = state => state.app.chatSocketIO;

export const getCities = state => state.app.cities;
export const getDistricts = state => state.app.districts;

export const getDistricts2 = state => state.app.districts2;

export const getChatList = state => state.app.chatList;
export const getSelectedCuid = state => state.app.selectedCuid;
export const getSearch = state => state.app.search;

// Export Reducer
export default AppReducer;
