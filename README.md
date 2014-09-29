TrueVault for Meteor
=============================

Use the TrueVault REST API easily with Meteor.

## Setup
1. Sign up for TrueVault and create a Vault and a User. **Tip:** Follow these instruction - https://www.truevault.com/documentation/quick-start.html
2. Add the package to your app `meteor add woody:truevault`
3. On the **server**, include the following configuration: 
```
Meteor.startup(function(){
    TrueVault.config({
      "API_KEY": "PASTE_YOUR_KEY",
      "VAULT_ID": "PASTE_YOUR_VAULT_ID"
    });
});

// Optional, but recommended.
// Add a default record to be stored on TrueVault after a user is created
Accounts.onCreateUser(function (options, user) {
  TrueVault.insert({
    default: "Default Value"
  }, user._id);

  // Keep the default hook's 'profile' behavior.
  if (options.profile)
    user.profile = options.profile;
  return user;
});

```

## Overview

This package requires an **accounts system**. The pattern used is one TrueVault document per Meteor user. On the client and the server, there is a `Collection` called `Vault`, which contains the TrueVault mapping for the Meteor user. The `Vault` collection on the client will only contain the record for the currently logged in user. There are **two ways** to use this package, the suggested (easy) way or a custom (advanced) way for different use cases. Both ways are summarized below.


### The Suggested (Easy) Way

Interact via the provided **client-only** collection called `TrueVault`. This collection will contain a mirror of the actual document stored in TrueVault for the currently logged in user. After you update this client-only collection with a standard `TrueVault.update()` call, the updated record will be sent and stored on TrueVault automatically. Make sure you are creating a default record after a user is created like shown in the setup `Accounts.onCreateUser` function above.

### The Custom (Advanced) Way

Use the TrueVault object on the server to do things like `TrueVault.insert(doc, userId)`. Use the simple server API documented below. More care must be taken if this method is chosen.


## API - Client

#### TrueVault

A standard Meteor Mongo Collection. Contains a mirror of the currently logged in users TrueVault record. When you do something like `TrueVault.update()`, the updates are automatically sent and stored on real TrueVault.

#### Vault

A standard Meteor Mongo Collection. Contains the TrueVault mapping for the currently logged in user. i.e. `{userId: "VAL", document_id: "VAL"}`.


## API - Server

#### TrueVault

An object with a number of useful methods:

**TrueVault.insert(doc, userId)**

The `doc` arg should be a standard JavaScript object to store on TrueVault. The `userId` is used to save the mapping in the `Vault` collection.

**TrueVault.findOne(document_id)**

Return the document on TrueVault based on the `document_id` that is passed.

**TrueVault.update(document_id, doc)**

The `document_id` is the selector, and the `doc` argument is what to update the **entire** record to. The entire record will be replaced by the passed `doc`.

**TrueVault.remove(document_id)**

Removes the specified document on TrueVault. This should be used with extreme care.

**TrueVault.config(obj)**

Extends the `settings` property on the server TrueVault object.

**TrueVault.settings**

An object that should have the following properties:
```
API_ENDPOINT: (set by default, do not override)
API_KEY: (set in the config call as documented in Setup above)
API_VAULTID: (set in the config call as documented in Setup above)
```


#### Meteor Methods
Ex: `Meteor.call('METHOD_NAME', args)`

**findOneTrueVault**

Returns the logged in users TrueVault record. Takes no arguments.

**updateTrueVault**

Takes one argument, a JavaScript object, and updates the logged in users entire TrueVault document to the passed object.


### Roadmap

1. ~~Simple way to store and retreive user records in TrueVault.~~
2. Make compatable with `audit-arguments-check` package.
3. Integrate TrueVault Blob API.

### License

MIT - http://opensource.org/licenses/MIT
