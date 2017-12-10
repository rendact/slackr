import Auth0Lock from "auth0-lock";
import client from "apollo";
import loginUserWithAuth0 from "queries/loginUserWithAuth0";
import { updateUser as updateUserMutation } from "queries/updateUser";

if (!process.env.REACT_APP_OAUTH_TOKEN) {
  throw "no REACT_APP_OAUTH_TOKEN as auth0 client id found";
}

let lock = new Auth0Lock(
  process.env.REACT_APP_OAUTH_TOKEN,
  "upslack.auth0.com",
  {
    auth: {
      responseType: "token id_token",
      params: {
        scope: "openid"
      }
    }
  }
);

let isRegister = userPayload => {
  /* 
     * expect userPayload as argument
   */

  if (!userPayload) {
    return false;
  }

  return !userPayload.fullname && !userPayload.displayname;
};

const updateUser = (options, onSuccess) => {
  /*
 * expected options: UpdateUserInput from scaphold
 * onSuccess: function when success
 */

  client
    .mutate({
      mutation: updateUserMutation,
      variables: { input: options }
    })
    .then(data => {
      onSuccess();
    })
    .catch(error => {
      debugger;
    });
};

function onAuthenticated(authResult) {
  /*
 * 1. parse authResult, get idToken
 * 2. set idToken as slackrToken
 * 3. login to scaphold using loginUserWithAuth0
 * 4. check fullname & displayname
 * 5. if found, pass
 * 6. not found, update user {fullname: name, displayname: nickname}
 * 7. authentication success
 */
  localStorage.setItem("slackrToken", authResult.idToken);
  lock.getUserInfo(authResult.accessToken, (error, profile) => {
    if (error) {
      // Handle error
      return;
    }

    client
      .mutate({
        mutation: loginUserWithAuth0,
        variables: { input: { idToken: authResult.idToken } }
      })
      .then(data => {
        const {
          data: { loginUserWithAuth0: { user: userPayload }, token }
        } = data;

        const onSuccess = () => {
          localStorage.setItem("slackrUserId", userPayload.id);
          localStorage.setItem("slackrToken", authResult.idToken);
        };

        if (isRegister(userPayload)) {
          debugger;
          updateUser(
            {
              fullname: profile.name,
              displayname: profile.nickname,
              id: userPayload.id
            },
            onSuccess
          ); // not created yet
          return;
        }

        return onSuccess();
      });
  });
}

lock.on("authenticated", onAuthenticated);

export default lock;
