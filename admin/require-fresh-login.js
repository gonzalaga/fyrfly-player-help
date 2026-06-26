(function exposeFreshAdminLoginReset() {
  function clearStorage(storage) {
    if (storage) {
      storage.clear();
    }
  }

  function expireReadableCookies() {
    document.cookie.split(";").forEach(function expireCookie(cookie) {
      var name = cookie.split("=")[0].trim();
      if (!name) {
        return;
      }

      [
        name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/",
        name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/admin",
        name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + window.location.hostname
      ].forEach(function writeExpiredCookie(value) {
        document.cookie = value;
      });
    });
  }

  function deleteIndexedDatabase(name) {
    return new Promise(function deleteDatabase(resolve) {
      var request = window.indexedDB.deleteDatabase(name);
      request.onsuccess = resolve;
      request.onerror = resolve;
      request.onblocked = resolve;
    });
  }

  async function clearIndexedDatabases() {
    if (!window.indexedDB) {
      return;
    }

    if (typeof window.indexedDB.databases === "function") {
      var databases = await window.indexedDB.databases();
      await Promise.all(databases.map(function deleteDatabase(database) {
        return database.name ? deleteIndexedDatabase(database.name) : Promise.resolve();
      }));
      return;
    }

    await Promise.all([
      "localforage",
      "netlify-cms",
      "decap-cms",
      "gotrue-js",
      "netlify-identity"
    ].map(deleteIndexedDatabase));
  }

  window.requireFreshAdminLogin = async function requireFreshAdminLogin() {
    try {
      clearStorage(window.localStorage);
      clearStorage(window.sessionStorage);
      expireReadableCookies();
      await clearIndexedDatabases();
    } catch (error) {
      console.warn("Could not clear cached admin login.", error);
    }
  };
}());
