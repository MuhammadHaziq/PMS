let Constants = {
    //  install
    install(Vue, options) {
      //  create global Constants
      Vue.Constants = {
        genders: {
            'UNSPECIFIED': 'Unspecified',
            'MALE': 'Male',
            'FEMALE': 'Female'
        }
      };
    }
  };
  
  export default Constants;