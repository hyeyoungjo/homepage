---
title: "Generative Lecture: Making Lecture Videos Interactive with LLMs and AI Clone Instructors"
type: "research"
year: 2025
authors: ["Hye-Young Jo", "Ada Zhao", "Xiaoan Liu", "Ryo Suzuki"]
venue: "arXiv"
abstract: "Generative Lecture embeds AI clone instructors into existing lecture videos using LLMs and avatar/voice synthesis, adding on-demand clarification, interactive examples, adaptive quizzes, and personalized explanations. A study (N=12) showed it supports personalized learning."
teaser: ./teaser.png
teaserAlt: "Generative Lecture interface with an AI clone instructor"
tags: ["LLM", "education", "video"]
links:
  pdf: "https://arxiv.org/pdf/2512.21796"
  doi: "https://arxiv.org/abs/2512.21796"
  youtube: "https://youtu.be/kyzg7RN4rUo"
featured: true
draft: false
bibtex: |
  @misc{jo2025generativelecturemakinglecture,
  title = {Generative Lecture: Making Lecture Videos Interactive with LLMs and AI Clone Instructors},
  author = {Hye-Young Jo and Ada Yi Zhao and Xiaoan Liu and Ryo Suzuki},
  year = {2025},
  eprint = {2512.21796},
  archivePrefix = {arXiv},
  primaryClass = {cs.HC},
  url = {https://arxiv.org/abs/2512.21796}
  }
---

## Problem: lecture videos are the same for everyone

Lecture videos on platforms like Coursera and Khan Academy are static: once published, every viewer
watches exactly the same content, regardless of their needs or context. The experience is passive and
one-directional: unlike an in-person lecture, you can't ask the video a question.

## Solution: an AI clone instructor that answers inside the video

Generative Lecture turns an existing lecture video into an interactive, personalized experience. An AI
clone of the instructor (built with HeyGen, ElevenLabs, and GPT-5) is embedded into the video, and
the system generates new material on demand in response to a student's question, inserting it into the
slides so the instructor appears to answer directly.

From a design elicitation study (N=8) we identified four goals, which guided eight features: on-demand
clarification, enhanced visuals, interactive examples, personalized explanations, adaptive quizzes,
study summaries, automatic highlights, and adaptive breaks.

## Evaluation

A user study (N=12) and expert feedback (N=5) suggested the system supports effective two-way
communication and personalized learning.
