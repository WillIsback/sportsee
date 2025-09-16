'use server';

export async function sanitizeRequest (request) {
  return request;
};

const trackers = {};


// from this tutorial -> https://www.youtube.com/watch?v=D770heiyxdc&t=143s
export async function rateLimitByKey(key, limit, window){
  if (!key) {
    throw new Error ("key not found");
  } 
  const tracker = trackers[key] || { count: 0, expiresAt: 0};
  console.log("tracker de rateLimit: ", tracker);

  if (!trackers[key]){
    trackers[key] = tracker;
  }
   
  if (tracker.expiresAt < Date.now()){
    tracker.count=0;
    tracker.expiresAt = Date.now() + window;

  }

  tracker.count++;

  if (tracker.count > limit){
    throw new Error("Rate limit exceeded");
  }

}