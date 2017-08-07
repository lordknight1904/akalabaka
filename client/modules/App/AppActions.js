import callApi from '../../util/apiCaller';
import localStorage from 'localStorage';

import * as firebase from 'firebase';
firebase.initializeApp({
  apiKey: "AIzaSyCe4i-rnJB-Xld_Yu9WaTcsSl6V7eSP7es",
  authDomain: "mystarter-29a6b.firebaseapp.com",
  databaseURL: "https://mystarter-29a6b.firebaseio.com",
  projectId: "mystarter-29a6b",
  storageBucket: "",
  messagingSenderId: "850211886725"
});
// Export Constants
export const ACTIONS = {
  TOGGLE_ADD_POST: 'TOGGLE_ADD_POST',
  RELOGIN: 'RELOGIN',
  LOGIN_SUCCEED: 'LOGIN_SUCCEED',
  SIGNUP_SUCCEED: 'SIGNUP_SUCCEED',
  APP_ERROR: 'APP_ERROR',
  LOG_OUT: 'LOG_OUT',
  JOB_HISTORY_UPDATED: 'JOB_HISTORY_UPDATED',
  ABOUT_UPDATED: 'ABOUT_UPDATED',
  STUDENT_UPDATED: 'STUDENT_UPDATED',
  TEACHING_UPDATED: 'TEACHING_UPDATED',
  YEAR_OF_BIRTH_UPDATED: 'YEAR_OF_BIRTH_UPDATED',
  NAME_UPDATED: 'NAME_UPDATED',
  NATIONALITY_UPDATED: 'NATIONALITY_UPDATED',
  GENDER_UPDATED: 'GENDER_UPDATED',
  MARKS_UPDATED: 'MARKS_UPDATED',
  ADDRESS_UPDATED: 'ADDRESS_UPDATED',
  FEE_UPDATED: 'FEE_UPDATED',
  AVATAR_URL: 'AVATAR_URL',
  BANNER_URL: 'BANNER_URL',
  SET_CHAT_SOCKET: 'SET_CHAT_SOCKET',

  ADD_CITIES: 'ADD_CITIES',
  ADD_DISTRICTS: 'ADD_DISTRICTS',
  ADD_DISTRICTS2: 'ADD_DISTRICTS2',

  ADD_NEW_CHAT: 'ADD_NEW_CHAT',
  ADD_CHAT: 'ADD_CHAT',
  READ_CHAT: 'READ_CHAT',
  SELECT_CUID: 'SELECT_CUID',
  LIKED: 'LIKED',
  FOLLOWED: 'FOLLOWED',
  SEARCH_RESULTS: 'SEARCH_RESULTS',
  CURRENT_PAGE: 'CURRENT_PAGE',
  PAGES: 'PAGES',
};

export function liked(liked){
  return {
    type: ACTIONS.LIKED,
    liked,
  };
}
export function like(like) {
  return (dispatch) => {
    return callApi('user/like', 'post', '', { like }).then(res => {
      if (res.user.code == 'success') {
        const likes = {
          likes: res.user.likes,
          userId: like.userId
        };
        dispatch(liked(likes));
      }
    });
  }
}
export function unlike(like) {
  return (dispatch) => {
    return callApi('user/unlike', 'post', '', { like }).then(res => {
      if (res.user.code == 'success') {
        const likes = {
          likes: res.user.likes,
          userId: like.userId
        };
        dispatch(liked(likes));
      }
    });
  }
}

export function followed(followed){
  return {
    type: ACTIONS.FOLLOWED,
    followed,
  };
}
export function follow(follow) {
  return (dispatch) => {
    return callApi('user/follow', 'post', '', { follow }).then(res => {
      if (res.user.code == 'success') {
        const follows = {
          follows: res.user.follows,
          userId: follow.userId
        };
        dispatch(followed(follows));
      }
      return res;
    });
  }
}
export function unfollow(follow) {
  return (dispatch) => {
    return callApi('user/unfollow', 'post', '', { follow }).then(res => {
      if (res.user.code == 'success') {
        const follows = {
          follows: res.user.follows,
          userId: follow.userId
        };
        dispatch(followed(follows));
      }
      return res;
    });
  }
}

export function addSearch(user) {
  return {
    type: ACTIONS.SEARCH_RESULTS,
    user
  };
}
export function currentPage(currentPage) {
  return {
    type: ACTIONS.CURRENT_PAGE,
    currentPage
  };
}
export function addPages(pages) {
  return {
    type: ACTIONS.PAGES,
    pages
  };
}
export function fetchSearch(path) {
  return (dispatch) => {
    return callApi(`${path}`).then(res => {
      console.log(res);
      dispatch(addSearch(res.user[0].users));
      dispatch(addPages(Math.ceil(res.user[0].count / 10)));
      dispatch(currentPage(1));
    });
  }
}
export function selectCuid(cuid) {
  return {
    type: ACTIONS.SELECT_CUID,
    cuid
  };
}
export function addChat(message) {
  return {
    type: ACTIONS.ADD_CHAT,
    message
  };
}
export function addNewChat(user) {
  return {
    type: ACTIONS.ADD_NEW_CHAT,
    user
  };
}
export function addDistricts2(districts) {
  return {
    type: ACTIONS.ADD_DISTRICTS2,
    districts
  };
}
export function fetchDistrict2(city) {
  return (dispatch) => {
    return callApi(`district/${city}`).then(res => {
      dispatch(addDistricts2(res.districts));
    });
  }
}

export function addDistricts(districts) {
  return {
    type: ACTIONS.ADD_DISTRICTS,
    districts
  };
}
export function fetchDistrict(city) {
  return (dispatch) => {
    return callApi(`district/${city}`).then(res => {
      dispatch(addDistricts(res.districts));
    });
  }
}
export function addCity(cities) {
  return {
    type: ACTIONS.ADD_CITIES,
    cities
  };
}
export function fetchCity() {
  return (dispatch) => {
    return callApi('city').then(res => {
      dispatch(addCity(res.cities));
    });
  }
}

export function setChatSocket(chatSocketIO) {
  return {
    type: ACTIONS.SET_CHAT_SOCKET,
    chatSocketIO
  };
}
export function signInSucceed(user) {
  localStorage.setItem('token', user.token);
  return {
    type: ACTIONS.LOGIN_SUCCEED,
    user,
  };
}
export function facebookLogin() {
  return (dispatch) => {
    const auth = firebase.auth();
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
      display: 'popup',
    });
    return auth.signInWithPopup(provider).then((user) => {
      let userInfo = {
        name: user.user.displayName,
        email: user.user.email,
        imgUrl: user.user.photoURL,
        socialId: user.user.uid,
        token: user.credential.accessToken,
        id: user.id,
        about: user.about,
        gender: user.gender,
        yearOfBirth: user.yearOfBirth,
        isStudent: user.isStudent,
        reading: user.reading,
        writing: user.writing,
        listening: user.listening,
        speaking: user.speaking,
        teachingAbility: user.teachingAbility,
        jobHistory: user.jobHistory,
        likes: user.likes,
        follows: user.follows,
        liked: user.liked,
        followed: user.followed,
        nationality: user.nationality,
        avatarUrl: user.imgUrl,
        bannerUrl: user.bannerUrl,
        isFee: user.isFee,
        fee: user.fee,
        address: user.address,
        chatHistory: user.chatHistory,
      };
      return callApi('user/auth/social', 'post', '', {userInfo}).then(res =>{dispatch(signInSucceed(res.user.user)); return res.user;});
    });
  };
}

export function signUpSucceed(user) {
  return {
    type: ACTIONS.SIGNUP_SUCCEED,
    user,
  };
}
export function createUserRequest(user) {
  return (dispatch) => {
    return callApi('user/auth', 'post', '', {user}).then(res => {
      if (res.user.code === 'success') {
        let user = res.user.user;
        user.id = user._id;
        if (res.user.code == 'success') dispatch(signUpSucceed(user));
        return res;
      }
    });
  };
}

export function userLoginRequest(user) {
  return (dispatch) => {
    return callApi('user/auth/login', 'post', '', {user}).then(res => {
      if (res.user.code == 'success') dispatch(signInSucceed(res.user.user));
      return res;
    });
  };
}
export function logout() {
  localStorage.removeItem('token');
  return {
    type: ACTIONS.LOG_OUT,
  };
}
export function signOutRequest(socialId) {
  if(socialId != '') {
    firebase.auth().signOut();
  }
  return (dispatch) => {
    dispatch(logout());
  }
}

export function reloginAttempt(token) {
  return (dispatch) => {
    return callApi('user/auth/relogin', 'post', token).then(res => {
      const user = {
        id: res.user.id,
        name: res.user.name,
        token: res.user.token,
        email: res.user.email,
        imgUrl: res.user.imgUrl,
        socialId: res.user.socialId,
        about: res.user.about,
        gender: res.user.gender,
        yearOfBirth: res.user.yearOfBirth,
        isStudent: res.user.isStudent,
        reading: res.user.reading,
        writing: res.user.writing,
        listening: res.user.listening,
        speaking: res.user.speaking,
        teachingAbility: res.user.teachingAbility,
        jobHistory: res.user.jobHistory,
        likes: res.user.likes,
        follows: res.user.follows,
        liked: res.user.liked,
        followed: res.user.followed,
        nationality: res.user.nationality,
        avatarUrl: res.user.avatarUrl,
        bannerUrl: res.user.bannerUrl,
        isFee: res.user.isFee,
        fee: res.user.fee,
        address: res.user.address,
        chatHistory: res.user.chatHistory,
      };
      if(res.user != 'none')
        dispatch(signInSucceed(user));
      return res;
    });
  };
}

export function updatedJobHistory(jobHistory){
  return {
    type: ACTIONS.JOB_HISTORY_UPDATED,
    jobHistory,
  };
}
export function updateJobHistory(jobHistory) {
  return (dispatch) => {
    return callApi('user/update/job', 'post', '', { jobHistory }).then(res => {
      if (res.user.code == 'success') dispatch(updatedJobHistory(res.user.user.jobHistory));
      return res;
    });
  }
}
export function updatedAbout(about){
  return {
    type: ACTIONS.ABOUT_UPDATED,
    about,
  };
}
export function updateAbout(about) {
  return (dispatch) => {
    return callApi('user/update/about', 'post', '', { about }).then(res => {
      if (res.user.code == 'success') dispatch(updatedAbout(res.user.user.about));
      return res;
    });
  }
}

export function updatedIsStudent(isStudent){
  return {
    type: ACTIONS.STUDENT_UPDATED,
    isStudent,
  };
}
export function updateIsStudent(isStudent) {
  return (dispatch) => {
    return callApi('user/update/student', 'post', '', { isStudent }).then(res => {
      if (res.user.code == 'success') dispatch(updatedIsStudent(res.user.user.isStudent));
      return res;
    });
  }
}
export function updatedTeachAbility(teachingAbility){
  return {
    type: ACTIONS.TEACHING_UPDATED,
    teachingAbility,
  };
}
export function updateTeachAbility(teachingAbility) {
  return (dispatch) => {
    return callApi('user/update/teaching', 'post', '', { teachingAbility }).then(res => {
      if (res.user.code == 'success') dispatch(updatedTeachAbility(res.user.user.teachingAbility));
      return res;
    });
  }
}

export function updatedName(name){
  return {
    type: ACTIONS.NAME_UPDATED,
    name,
  };
}
export function updateName(name) {
  return (dispatch) => {
    return callApi('user/update/name', 'post', '', { name }).then(res => {
      if (res.user.code == 'success') dispatch(updatedName(res.user.user.name));
      return res;
    });
  }
}
export function updatedNationality(nationality){
  return {
    type: ACTIONS.NATIONALITY_UPDATED,
    nationality,
  };
}
export function updateNationality(nationality) {
  return (dispatch) => {
    return callApi('user/update/nationality', 'post', '', { nationality }).then(res => {
      if (res.user.code == 'success') dispatch(updatedNationality(res.user.user.nationality));
      return res;
    });
  }
}
export function updatedGender(gender){
  return {
    type: ACTIONS.GENDER_UPDATED,
    gender,
  };
}
export function updateGender(gender) {
  return (dispatch) => {
    return callApi('user/update/gender', 'post', '', { gender }).then(res => {
      if (res.user.code == 'success') dispatch(updatedGender(res.user.user.gender));
      return res;
    });
  }
}


export function updatedFee(fee){
  return {
    type: ACTIONS.FEE_UPDATED,
    fee,
  };
}
export function updateFee(fee) {
  return (dispatch) => {
    return callApi('user/update/fee', 'post', '', { fee }).then(res => {
      if (res.user.code == 'success') {
        const fee = {
          isFee: res.user.user.isFee,
          fee: res.user.user.fee,
        };
        dispatch(updatedFee(fee));
      }
      return res;
    });
  }
}
export function updatedAddress(address){
  return {
    type: ACTIONS.ADDRESS_UPDATED,
    address,
  };
}
export function updateAddress(address) {
  return (dispatch) => {
    return callApi('user/update/address', 'post', '', { address }).then(res => {
      if (res.user.code == 'success') dispatch(updatedAddress(res.user.user.address));
      return res;
    });
  }
}

export function updatedYearOfBirth(yearOfBirth){
  return {
    type: ACTIONS.YEAR_OF_BIRTH_UPDATED,
    yearOfBirth,
  };
}


export function updateYearOfBirth(yearOfBirth) {
  return (dispatch) => {
    return callApi('user/update/year', 'post', '', { yearOfBirth }).then(res => {
      if (res.user.code == 'success') dispatch(updatedYearOfBirth(res.user.user.yearOfBirth));
      return res;
    });
  }
}
export function updatedMarks(marks){
  return {
    type: ACTIONS.MARKS_UPDATED,
    marks,
  };
}
export function updateMarks(marks) {
  return (dispatch) => {
    return callApi('user/update/marks', 'post', '', { marks }).then(res => {
      if (res.user.code == 'success') {
        const marks = {
          reading: res.user.user.reading,
          listening: res.user.user.listening,
          writing: res.user.user.writing,
          speaking: res.user.user.speaking,
        };
        dispatch(updatedMarks(marks));
      }
      return res;
    });
  }
}

export function uploadedBanner(bannerUrl){
  return {
    type: ACTIONS.BANNER_URL,
    bannerUrl,
  };
}
export function uploadBanner(base64image, id) {
  const file = {
    base64image,
    id,
  };
  return (dispatch) => {
    return callApi('user/banner', 'post', '', { file }).then(res => {
      if (res.user.code == 'success') dispatch(uploadedBanner(res.user.user.bannerUrl));
      return res;
    });
  }
}
export function uploadedAvatar(avatarUrl){
  return {
    type: ACTIONS.AVATAR_URL,
    avatarUrl,
  };
}
export function uploadAvatar(base64image, id) {
  return (dispatch) => {
    const file = {
      base64image,
      id,
    };
    return callApi('user/avatar', 'post', '', { file }).then(res => {
      if (res.user.code == 'success') dispatch(uploadedAvatar(res.user.user.avatarUrl));
      return res;
    });
  }
}
export function readChat(read){
  return {
    type: ACTIONS.READ_CHAT,
    read,
  };
}
export function readMessage(read) {
  return (dispatch) => {
    return callApi('user/read', 'post', '', { read }).then(res => {
      if (res.read !== 'error') {
        dispatch(readChat(res.read.cuid));
      }
    });
  }
}
