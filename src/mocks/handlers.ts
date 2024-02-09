import { http, HttpResponse } from "msw";
import { WeatherCard } from "../store/features/weather-cards";

const data: WeatherCard = {
  id: "u6tl5g7s0ym",
  author: "lala",
  comment: "fdsafs",
  date: "19.02.2203",
  temp: 0,
  weather: "sunny",
};
const data2: WeatherCard = {
  id: "dkfakdflasdkfasl",
  author: "lala",
  comment: "fdsafs",
  date: "19.02.2203",
  temp: 32,
  weather: "not sunny",
};

const data3: WeatherCard = {
  id: "fadfa3323fad",
  author: "mana",
  comment: "hi tha man",
  date: "01.01.2010",
  temp: -23,
  weather: "cloudy",
};

let arr = [data, data2, data3];

export const handlers = [
  http.get("/", () => {
    return HttpResponse.json(arr);
  }),

  http.get("/weather/:id", async ({ params }) => {
    const { id } = params;
    const item = arr.filter((i) => i.id === id)[0];

    return HttpResponse.json(item, { status: 201 });
  }),

  http.post("/weather/add", async ({ request }) => {
    // Read the intercepted request body as JSON.
    const newPost = (await request.json()) as WeatherCard;

    // Push the new post to the map of all posts.
    arr.push(newPost);

    // Don't forget to declare a semantic "201 Created"
    // response and send back the newly created post!
    return HttpResponse.json(arr, { status: 201 });
  }),

  http.patch("/weather/update/:id", async ({ request }) => {
    const updatedPost = (await request.json()) as WeatherCard;
    const filtered = arr.filter((i) => i.id !== updatedPost.id);
    filtered.push(updatedPost);

    arr = filtered;

    return HttpResponse.json(arr, { status: 201 });
  }),

  http.delete("/weather/:id", async ({ params }) => {
    const { id } = params;
    const items = arr.filter((i) => i.id !== id);
    arr = items;
    return HttpResponse.json(items, { status: 201 });
  }),
];
