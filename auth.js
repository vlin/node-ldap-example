// ldap module from http://ldapjs.org/
var ldap = require('ldapjs');

module.exports = function(username, password, callback) {
  var client = ldap.createClient({
    url: 'ldap://10.0.2.26:389'
  }),
    dc = 'DC=example,DC=com';

  client.bind('sv\\' + username, password, function(err) {
    callback(err);
    if (err) {
      console.log(err);
      return;
    }

    var opts = {
      filter: '(sAMAccountName=' + username + ')',
      scope: 'sub'
    };

    client.search(dc, opts, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }

      res.on('searchEntry', function(entry) {
        console.log('entry: ' + JSON.stringify(entry.object));
      });
      res.on('error', function(err) {
        console.error('error: ' + err.message);
      });
      res.on('end', function(result) {
        console.log('status: ' + result.status);
        client.unbind(function(err) {
          console.log('unbinded.');
        });
      });
    });
  });
};