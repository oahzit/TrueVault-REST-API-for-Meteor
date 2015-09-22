Package.describe({
  summary: "Use the TrueVault REST API with Meteor.",
  version: "0.0.1",
  git: "https://github.com/oahzit/TrueVault-REST-API-for-Meteor.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.0');
  api.use('http', 'server');
  api.use('underscore');
  api.use('mongo@1.0.6');
  api.use('tracker@1.0.2');
  api.use('audit-argument-checks@1.0.0');
  api.use('session@1.0.0');

  api.addFiles('hmac-sha256.js', 'server');
  api.addFiles('enc-base64-min.js', 'server');

  api.addFiles('truevault_both.js');
  api.addFiles('truevault_client.js', 'client');
  api.addFiles('truevault_server.js', 'server');

  // Export the object 'TrueVault' to packages or apps that use this package.
  api.export('TrueVault');
  api.export('Vault');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('tiz:truevault');
  api.addFiles('tiz:truevault-tests.js');
});
