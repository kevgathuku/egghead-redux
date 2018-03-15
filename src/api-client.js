import "whatwg-fetch";

const API_ENDPOINT = "https://jsonplaceholder.typicode.com";

// export const myFetch = (url, request) => {
//   fetch(url, request).then(response =>
//     response.json().then(json => {
//       console.log("Response JSON: ", json);
//       return json;
//     })
//   );
// };

export const fetchRemoteTodos = async () => {
  const response = await fetch(`${API_ENDPOINT}/todos`);
  const json = await response.json();
  console.log("Response JSON: ", json);
  return json;
};
