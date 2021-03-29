import { StyleSheet } from 'react-native';

let styles;

// eslint-disable-next-line no-unused-vars
export default styles = StyleSheet.create({
  // for app component
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
