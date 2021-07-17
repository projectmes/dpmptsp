import React from 'react';

exports.Server = 'http://neraka.id/rahmat';

exports.convertToURLEncoded = (details) => {

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody
  }

