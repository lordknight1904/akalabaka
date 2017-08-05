// Import Actions
import { ACTIONS } from './UserActions';
import {REHYDRATE} from 'redux-persist/constants'

// Initial State
const initialState = {
  id: '',
  email: '',
  name: '',
  imgUrl: '',
  socialId: '',
  about: '',
  gender: '',
  yearOfBirth: '',
  nationality: '',

  likes: '',
  follows: '',

  isStudent: '',
  reading: '',
  writing: '',
  listening: '',
  speaking: '',

  address: '',
  fee: '',
  isFee: '',

  avatarUrl: '',
  bannerUrl: '',

  teachingAbility: '',
  jobHistory: '',

  chatHistory: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      const incoming = action.payload.app;
      return {...state};
    case ACTIONS.FETCH_USER:
      console.log(action);
      return {
        ...state,
        id: action.user.id,
        name: action.user.name,
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
    case ACTIONS.ERASE_USER:
      return {
        ...state,
        id: '',
        name: '',
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
    default:
      return state;
  }
};

export const getId = state => state.user.id;
export const getName = state => state.user.name;
export const getToken = state => state.user.token;
export const getEmail = state => state.user.email;
export const getImgUrl = state => state.user.imgUrl;
export const getSocialId= state => state.user.socialId;

export const getAbout= state => state.user.about;
export const getGender= state => state.user.gender;
export const getYearOfBirth= state => state.user.yearOfBirth;
export const getNationality= state => state.user.nationality;
export const getIsStudent= state => state.user.isStudent;
export const getIsFee = state => state.user.isFee;
export const getFee = state => state.user.fee;
export const getAddress= state => state.user.address;
export const getReading= state => state.user.reading;
export const getListening= state => state.user.listening;
export const getWriting= state => state.user.writing;
export const getSpeaking= state => state.user.speaking;
export const getTeachingAbility= state => state.user.teachingAbility;
export const getJobHistory= state => state.user.jobHistory;
export const getLikes= state => state.user.likes;
export const getFollow= state => state.user.follows;
export const getLiked = state => state.user.liked;
export const getFollowed = state => state.user.followed;

export const getBannerUrl= state => state.user.bannerUrl;
export const getAvatarUrl= state => state.user.avatarUrl;
// Export Reducer
export default UserReducer;
