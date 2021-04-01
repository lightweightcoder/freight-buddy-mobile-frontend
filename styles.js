import { StyleSheet } from 'react-native';

let styles;

// eslint-disable-next-line no-unused-vars
export default styles = StyleSheet.create({
  // general
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollView: {
    backgroundColor: '#ffefcf',
  },

  // for login screen
  input: {
    width: '40%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    paddingHorizontal: 5,
  },

  invalidMessage: {
    color: 'red',
    textAlign: 'center',
  },

  loginButton: {
    width: '40%',
  },

  demoLoginButton: {
    width: '40%',
    marginTop: 10,
  },

  logoutButton: {

  },
});
