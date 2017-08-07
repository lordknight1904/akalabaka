const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mystarter',
  port: process.env.PORT || 8000,

  facebookAuth : {
    'clientID'      : '1696583267312274',
    'clientSecret'  : '615dd0e372807362f7ded22d106d147b',
    // 'callbackURL'   : 'http://localhost:8000/user/auth/facebook/callback'
    'callbackURL'   : 'https://mystarter-29a6b.firebaseapp.com/__/auth/handler'
  },
  firebaseConfig: {
    apiKey: "AIzaSyCe4i-rnJB-Xld_Yu9WaTcsSl6V7eSP7es",
    authDomain: "mystarter-29a6b.firebaseapp.com",
    databaseURL: "https://mystarter-29a6b.firebaseio.com",
    projectId: "mystarter-29a6b",
    storageBucket: "",
    messagingSenderId: "850211886725"
  },
};

export default config;
