import { NextResponse } from "next/server";

const pageAnswers = [
  {
    tags: ["about", "who we are", "mission", "vision", "history", "about page"],
    reply:
      "The About page shares that Living Faith Church New Jerusalem, Ilorin is a faith-based church located at Gaa Imam beside ITC company. We focus on worship, discipleship, outreach, training, and spiritual growth.",
  },
  {
    tags: ["books", "bookshop", "resources", "book page"],
    reply:
      "The Books page contains faith-building materials from Living Faith Church. It highlights books and resources designed to strengthen your walk with God.",
  },
  {
    tags: ["contact", "support", "email", "phone", "call", "contact page"],
    reply:
      "The Contact page gives our email addresses and phone number. You can reach us at +2347080638000, lfcwwilr@yahoo.com, or Kwara.state@lfcww.org.",
  },
  {
    tags: ["give online", "give", "donate", "tithe", "offering", "project seed", "kingdom covenant", "giveonline"],
    reply:
      "The Give Online page shows how to give with purpose. Tithe and offering is 1025217761 (UBA), project seed is 1227870144 (Zenith), and Kingdom Covenant is 1311789303 (Zenith).",
  },
  {
    tags: ["ministries", "ministry", "service unit", "children church", "youth church", "teens church", "adult church", "ministries page"],
    reply:
      "The Ministries page explains our church ministries. We have dedicated spaces for Adults, Youth, Teens, and Children, plus service units and outreach teams.",
  },
  {
    tags: ["wofbi", "word of faith bible institute", "bible institute"],
    reply:
      "WOFBI is the Word of Faith Bible Institute. It offers training courses that equip members to live victoriously in faith and fulfill God’s mandate.",
  },
  {
    tags: ["wsf", "winners satellite fellowship", "winners satellite"],
    reply:
      "WSF is Winners Satellite Fellowship. It is designed to care for members, feed them spiritually, teach them, and build leaders in a loving fellowship.",
  },
  {
    tags: ["main church", "mainchurch", "adult church", "living faith main church"],
    reply:
      "The Main Church ministry is for adults to deepen their faith, grow spiritually, and worship in a supportive environment. It also shares service times and ministry details.",
  },
  {
    tags: ["faith academy", "faithacademy", "education", "school", "learning"],
    reply:
      "Faith Academy and Education pages describe our training and learning opportunities. They focus on spiritual growth, discipleship, and life preparation.",
  },
  {
    tags: ["mandate", "mandate page"],
    reply:
      "The Mandate page explains our purpose: to spread God’s word, build lives, and raise people who live with faith, purpose, and impact.",
  },
  {
    tags: ["our pastors", "pastors", "pastor page"],
    reply:
      "The Our Pastors page introduces Pastor Kayode Martins, Pastor Christian Femi Ekpekhio, and Pastor Salami Opeyemi, who lead and serve our church.",
  },
  {
    tags: ["media", "media page"],
    reply:
      "The Media page is focused on church outreach through audio, video, and digital content. It supports the church’s message and broadcasts.",
  },
  {
    tags: ["khms", "khms page"],
    reply:
      "The KHMS page highlights the King’s Heritage Ministerial School ministry. It supports training, ministry development, and spiritual leadership.",
  },
  {
    tags: ["wsf location", "wsflocation", "location page"],
    reply:
      "The WSF Location page helps you find nearest fellowship points and home cell meetings close to you.",
  },
  {
    tags: ["childrenchurch", "children church", "kids church", "children"],
    reply:
      "Children Church is a fun, safe place where kids learn God’s word through engaging lessons and caring teaching.",
  },
  {
    tags: ["teenschurch", "teen church", "teens"],
    reply:
      "Teen Church is a supportive environment for teenagers to grow in faith, character, and confidence while building community.",
  },
  {
    tags: ["youthchurch", "youth church", "youth"],
    reply:
      "Youth Church is for young adults to discover purpose, grow spiritually, and connect with peers in a vibrant church setting.",
  },
];

function pickReply(message) {
  const normalized = message.trim().toLowerCase();

  if (!normalized) {
    return "Please type a question about the church, its pages, our ministries, or contact information.";
  }

  const candidates = [
    {
      tags: ["location", "address", "where"],
      reply:
        "Our church is located at Gaa Imam beside ITC company in Ilorin, Kwara State. You can also find the map on the Contact page.",
    },
    {
      tags: ["contact", "support", "email", "phone", "reach"],
      reply:
        "Contact us at +2347080638000 or email lfcwwilr@yahoo.com or Kwara.state@lfcww.org.",
    },
    {
      tags: ["service", "time", "schedule", "worship", "sunday", "wednesday", "monday"],
      reply:
        "Our main worship services include Sundays at 7AM, Mondays at 6PM, and Wednesdays at 5PM. Special ministry services are listed on each page.",
    },
    {
      tags: ["give", "donate", "tithe", "offering", "project seed", "kingdom covenant"],
      reply:
        "You can give online through the Give Online page. Tithe is 1025217761 (UBA), Project Seed is 1227870144 (Zenith), and Kingdom Covenant is 1311789303 (Zenith).",
    },
  ];

  const allAnswers = [...pageAnswers, ...candidates];

  const scored = allAnswers.map((item) => ({
    reply: item.reply,
    score: item.tags.reduce((count, tag) => (normalized.includes(tag) ? count + 1 : count), 0),
  }));

  const best = scored.reduce((bestSoFar, current) => (current.score > bestSoFar.score ? current : bestSoFar), { reply: "", score: 0 });

  if (best.score > 0) {
    return best.reply;
  }

  const pagesList = [
    "About",
    "Books",
    "Contact",
    "Give Online",
    "Ministries",
    "WOFBI",
    "WSF",
    "Main Church",
    "Faith Academy",
    "Education",
    "Mandate",
    "Our Pastors",
    "Media",
    "KHMS",
    "WSF Location",
    "Children Church",
    "Teen Church",
    "Youth Church",
    "Service Unit",
  ];

  return (
    `I can answer questions about any page on this site, including: ${pagesList.join(", ")}. ` +
    "Please ask about a specific page, ministry, or topic and I’ll give you the information from the website."
  );
}

export async function POST(req) {
  const body = await req.json();
  const message = typeof body?.message === "string" ? body.message : "";
  const reply = pickReply(message);

  return NextResponse.json({ reply });
}
