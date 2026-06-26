(function requireFreshAdminLogin() {
  var authKeyPattern = /(netlify-cms|decap-cms|netlifycms|decapcms|gotrue|git-gateway|identity|auth|token|user)/i;

  function clearMatchingKeys(storage) {
    if (!storage) {
      return;
    }

    var keys = [];
    for (var index = 0; index < storage.length; index += 1) {
      keys.push(storage.key(index));
    }

    keys.forEach(function removeAuthKey(key) {
      if (key && authKeyPattern.test(key)) {
        storage.removeItem(key);
      }
    });
  }

  try {
    clearMatchingKeys(window.localStorage);
    clearMatchingKeys(window.sessionStorage);
  } catch (error) {
    console.warn("Could not clear cached admin login.", error);
  }
}());
