# Instagram Bulk Fetch
xD

## Use
USERNAME_INSTAGRAM = String  
CONTINUE = Bool  

```
git clone
npm install
node index.js <USERNAME_INSTAGRAM> <Optional: CONTINUE>
```

## Right from the source
1. get cookie from IG
2. put cookie as header
3. get ```query_hash``` from variable ```queryId``` at ```2nd``` match (after "pagination},") 
```
https://www.instagram.com/static/bundles/ProfilePageContainer.js/031ac4860b53.js
```
3. a. or get ```query_hash``` from /es6/Consumer.js/xxx.js at ```16th``` match (after "pagination},")
```
https://www.instagram.com/static/bundles/es6/Consumer.js/b693ea5decc6.js
```
4. HTTP ```GET https://www.instagram.com/graphql/query/?query_hash=<QUERY_HASH>&variables={"id":"<ID_IG>","first":12}```
5. for next 12 posts use variable ```"after":"<END_CURSOR>"```

### First Request no need after key
```
https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a&variables={"id":"6933703215","first":12}
```

### Example Request
```
https://www.instagram.com/graphql/query/?query_hash=f2405b236d85e8296cf30347c9f08c2a&variables={"id":"6933703215","first":12,"after":"QVFBNWI3cWZYbWxyTFF1Mkh6WDdCcjh5Ti1ITkRsNXVXSGxob3I2VW5ldTVKVmVoVlQ4ZlF2RlFNa3M1OFhXYVlSSS1jN3JDU0s4QXl5bG9nY2ppVXNQRg=="}
```

### Other Example Request
```
https://www.instagram.com/graphql/query/?query_id=17888483320059182&id=2192579185&first=12&after=QVFBekZhNi1ic3p4QXRJd1FJTXBqWlJQWWZaelNReEJXSVRhZDN1SmJZT2RnYTFXc0pXV1dRbTlYcURETEx6QXRVTXhlTUpsdi1vY3pBZE1FbDhFbVFPQQ==
```


fariswd  
2019
