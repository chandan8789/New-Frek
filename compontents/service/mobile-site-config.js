const mobile_siteConfig = Object.freeze({
  MOB_ACCESS_TOKEN_KEY: 'token',
  USER_DETAIL: 'userDetail',
  IS_LOGIN: 'FALSE',

  // BASE_URL: 'http://10.0.2.2:4000/',
  BASE_URL: 'https://thefrekapp.com/',
  CHAT_SOCKET_URL: 'https://thefrekapp.com/',
  // auth
  signup: 'auth/signup',
  question: 'user/questions',
  login: 'auth/login',
  carousel: 'user/feed',


  // chat
  getAllConversations: "message/conversations",
  getIndividualsConversations: "message/conversations/",
  sendMessage: 'message/send/',

});

export default mobile_siteConfig;
