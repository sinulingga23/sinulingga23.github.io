var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BDWf4KOTdgvw-gMn_H2jXddUh9qpndGdTWW5FuGqoOsfKz00zLz6i0fh3MOIIuRPTpU4d3dzeFcE3SCieoj12vo",
   "privateKey": "8L0VmsYMAvxN1ntwXZxAUWY2ZBHAhn7aCfYuNqi7ei0"
};
 
 
webPush.setVapidDetails(
   'mailto:sinulinggatwo@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)

var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dOSIh7jBGvc:APA91bFdI_tezSUwHZ8JWFTOPi7MMjMl-BFALDgZz3B6GkhCLihRb2LL1UPqEmBDdPfrRZI09bQb-uqrkwoMA8l-BdH4QCV9NeAKieqipzTaFpShldC-v1E0Zpvyy52hMxcW8LfF3zm-",
   "keys": {
       "p256dh": "BCPab5l4e4ricH7ZsSUbtMH9DppTrImgR07niQ6Xqgv73geBqAiwgqchVpiURF4YRHqUCjN9eOMSHYom0GZd+cE=",
       "auth": "f1YPQnad8VbpNCWe7asxJA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1053776408816',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);