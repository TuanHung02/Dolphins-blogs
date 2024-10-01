import avt from "../assets/avt1.jpg";

export const channels = [
  {
    id: 1,
    avt: avt,
    name: "RollRoys 1",
    status: "Call of Duty",
    viewers: 2800,
    followers: 500000,
    videos: 120,
    views: 23,
    stars: 23,
    tags: ["js", "node", "agl"],
  },
  {
    id: 2,
    avt: avt,
    name: "Audi 2",
    status: "Call of Duty",
    viewers: 2800,
    followers: 500000,
    videos: 120,
    views: 23,
    stars: 23,
    tags: ["js", "node", "agl"],
  },
  {
    id: 3,
    avt: avt,
    name: "BMW 3",
    status: "Call of Duty",
    viewers: 2800,
    followers: 500000,
    videos: 120,
    views: 23,
    stars: 23,
    tags: ["js", "node", "agl"],
  },
  {
    id: 4,
    avt: avt,
    name: "Mercerdes 4",
    status: "Call of Duty",
    viewers: 2800,
    followers: 500000,
    videos: 120,
    views: 23,
    stars: 23,
    tags: ["js", "node", "agl"],
  },
  {
    id: 5,
    avt: avt,
    name: "Porsche 5",
    status: "Call of Duty",
    viewers: 2800,
    followers: 500000,
    videos: 120,
    views: 23,
    stars: 23,
    tags: ["js", "node", "agl"],
  },
  {
    id: 6,
    avt: avt,
    name: "Lamborgini 6",
    status: "Call of Duty",
    viewers: 2800,
    followers: 500000,
    videos: 120,
    views: 23,
    stars: 23,
    tags: ["js", "node", "agl"],
  },
  {
    id: 7,
    avt: avt,
    name: "Ferrari 7",
    status: "Call of Duty",
    viewers: 2800,
    followers: 500000,
    videos: 120,
    views: 23,
    stars: 23,
    tags: ["js", "node", "agl"],
  },
  {
    id: 8,
    avt: avt,
    name: "Bently 8",
    status: "Call of Duty",
    viewers: 2800,
    followers: 500000,
    videos: 120,
    views: 23,
    stars: 23,
    tags: ["js", "node", "agl"],
  },
];

export const TAG = {
  js: { label: "JavaScript" },
  node: { label: "Node JS" },
  vue: { label: "Vue JS" },
  agl: { label: "Angular" },
  next: { label: "NextJS" },
};
// console.log(Object.keys(TAG).includes("nextJS"));
// Object.keys(TAG).includes("nextJS") && console.log(TAG["nextJS"]);
export const tags = [
  {
    id: 1,
    img: avt,
    label: "js",
    articles: "2800",
  },
  {
    id: 2,
    img: avt,
    label: "node",
    articles: "2800",
  },
  {
    id: 3,
    img: avt,
    label: "vue",
    articles: "2800",
  },
  {
    id: 4,
    img: avt,
    label: "agl",
    articles: "2800",
  },
  {
    id: 5,
    img: avt,
    label: "next",
    articles: "2800",
  },
];

export const authors = [
  {
    id: 1,
    avt: avt,
    name: "Đặng Tuấn Phong",
  },
  {
    id: 2,
    avt: avt,
    name: "Bùi Tuấn Hùng",
  },
  {
    id: 3,
    avt: avt,
    name: "Nguyễn Văn Bê",
  },
];

export const posts = [
  {
    id: 1,
    authorId: 1,
    img: avt,
    timeAgo: 12,
    title: "Why You Should Use Node.js for Ecommerce: Pros and Cons",
    description:
      "Node.js is a JavaScript runtime environment which developers use to build scalable network applications. You can use it in various software, including ecommerce platforms. To deliver high performance …",
    tags: ["js", "node", "agl", "next", "vue"],
    view: 23,
    star: 23,
    comment: 23,
  },
  {
    id: 2,
    authorId: 2,
    img: "",
    timeAgo: 4,
    title: "Sets this property to its default value. Read about initial",
    description:
      "	Required. The vertical offset of the shadow. A positive value puts the shadow below the box, a negative value puts the shadow above the box",
    tags: ["next", "vue"],
    view: 12,
    star: 12,
    comment: 2,
  },
  {
    id: 3,
    authorId: 3,
    img: "",
    timeAgo: 12,
    title: "Why You Should Use Node.js for Ecommerce: Pros and Cons",
    description:
      "Node.js is a JavaScript runtime environment which developers use to build scalable network applications. You can use it in various software, including ecommerce platforms. To deliver high performance …",
    tags: ["js", "node", "agl", "next", "vue"],
    view: 23,
    star: 23,
    comment: 23,
  },
];

export const options = [
  {
    id: 1,
    title: "New Feed",
    icon: "fa-regular fa-font-awesome",
  },
  {
    id: 2,
    title: "Explore",
    icon: "fa-regular fa-compass",
  },
  {
    id: 3,
    title: "Bookmark",
    icon: "fa-regular fa-bookmark",
  },
  {
    id: 4,
    title: "My Posts",
    icon: "fa-regular fa-pen-to-square",
  },
];
export const trendings = [
  {
    id: 1,
    title: "Javascript",
    tags: 202,
  },
  {
    id: 2,
    title: "React JS",
    tags: 23,
  },
  {
    id: 3,
    title: "Node JS",
    tags: 43,
  },
  {
    id: 4,
    title: "Vue JS",
    tags: 23,
  },
];
