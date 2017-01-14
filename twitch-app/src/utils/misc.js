export const timeoutPromise = delay => new Promise((resolve, reject) => {
  setTimeout(
    () => reject('Timeout!'),
    delay
  );
});

// get or set the interval
let queryInterval;
export const getInt = () => queryInterval;
export const setInt = input => queryInterval = input;
