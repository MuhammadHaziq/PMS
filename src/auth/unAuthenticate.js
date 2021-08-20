export default (to, from, next) => {
  if (
    localStorage.getItem("access_token") != null &&
    localStorage.getItem("access_token").length > 0 && to.name != "video-call-room"
  ) {
    next("/app");
  } else {
    next();
  }
};
