---
title: "TingleTouch: Touch Guidance through Electrical Stimulation in Resistance Training"
type: "research"
year: 2026
authors: ["Dong-Uk Kim", "Hye-Young Jo", "Hankyung Kim", "Ryo Suzuki", "Seungwoo Je", "Yoonji Kim"]
venue: "ACM CHI"
abstract: "TingleTouch uses electrical muscle stimulation to recreate a personal trainer's touch guidance during resistance training. In a study with 16 gym-goers, participants distinguished instructional cues with 97-99% accuracy across two sessions."
teaser: ./teaser.png
teaserAlt: "TingleTouch electrical stimulation guidance during weight training"
tags: ["EMS", "fitness", "haptics"]
links:
  pdf: "https://drive.google.com/file/d/15D7VAkpKfBW5MitF5YWIJlyh6L2CnTNe/view?usp=drive_link"
  doi: "https://doi.org/10.1145/3772318.3791646"
  youtube: "https://youtu.be/yZm9aFTJ3pE"
  presentation: "https://www.youtube.com/watch?v=c2V6KSM-8po"
featured: false
draft: false
bibtex: |
  @inproceedings{10.1145/3772318.3791646,
  author = {Kim, Dong-Uk and Jo, Hye-Young and Kim, Hankyung and Suzuki, Ryo and Je, Seungwoo and Kim, Yoonji},
  title = {TingleTouch: Touch Guidance through Electrical Stimulation in Resistance Training},
  year = {2026},
  isbn = {9798400722783},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  url = {https://doi.org/10.1145/3772318.3791646},
  doi = {10.1145/3772318.3791646},
  booktitle = {Proceedings of the 2026 CHI Conference on Human Factors in Computing Systems},
  articleno = {230},
  numpages = {20},
  series = {CHI '26}
  }
---

## Problem: a trainer's touch is hard to replicate alone

In resistance training, trainers use touch to help trainees fix their posture and activate the right
muscles. Haptic feedback could bring that support to solitary workouts, but translating the nuance of a
trainer's touch into effective haptic patterns is difficult.

## Solution: electrical stimulation patterns for a trainer's cues

We categorized the instructional messages a trainer conveys through touch and designed electrical
stimulation (EMS) patterns to replicate them. A preliminary study with six trainers and six trainees
identified six core messages; we designed an EMS pattern for each and refined them with two sports
scientists and a UX designer.

## Evaluation

Sixteen gym-goers tested the patterns in a controlled exercise task. They reliably distinguished the
feedback and engaged the instructed muscles (97.14% and 99.22% accuracy across two sessions,
cross-checked with EMG and pose estimation), showing the feedback is intuitive and learnable.
