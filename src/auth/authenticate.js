import store from '../store';

export const authenticateInPractice = (to, from, next) => {
  if(!store.getters.loggedInUser){
    store.dispatch('signOut');
    return next("/signIn");
  }
  // practice check
  const practice = localStorage.getItem('selected_practice')?JSON.parse(localStorage.getItem('selected_practice')):null;
  if(practice){
    store.dispatch('getPractice', practice).then(data=>{
      store.commit('setSelectedPractice', data);
      next();
    }).catch(err=>{
      store.commit('removeSelectedPractice');
      next("/select-practice");
    });
  }else{
    next("/select-practice");
  }
}

export default (to, from, next) => {
  if (store.getters.loggedInUser) {
    next();
  } else {
    store.dispatch('signOut');
    next("/signIn");
  }
};
