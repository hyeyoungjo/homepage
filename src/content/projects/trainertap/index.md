---
title: "TrainerTap: Weightlifting Support System Prototype Simulating Personal Trainer's Tactile and Auditory Guidance"
type: "research"
year: 2023
authors: ["Hye-Young Jo", "Chan Hu Wie", "Yejin Jang", "Dong-Uk Kim", "Yurim Son", "Yoonji Kim"]
venue: "ACM UIST (Adjunct)"
abstract: "TrainerTap is a weightlifting support prototype that simulates a personal trainer's tactile and auditory guidance (tapping target muscles to direct attention and giving auditory tempo cues), so solo lifters feel a trainer's presence."
teaser: ./teaser.png
teaserAlt: "TrainerTap weightlifting guidance prototype"
tags: ["fitness", "haptics", "wearable"]
acceptanceRate: "21.0%"
links:
  pdf: "https://drive.google.com/file/d/189Ssskkj0ggW2maS2Q9hEtdPIDiDDI1r/view"
  doi: "https://dl.acm.org/doi/10.1145/3586182.3616644"
  youtube: "https://youtu.be/QeS3mkFHtu8"
  presentation: "https://youtu.be/a2DRrNdZ4nc"
featured: false
draft: false
bibtex: |
  @inproceedings{10.1145/3586182.3616644,
  author = {Jo, Hye-Young and Wie, Chan Hu and Jang, Yejin and Kim, Dong-Uk and Son, Yurim and Kim, Yoonji},
  title = {TrainerTap: Weightlifting Support System Prototype Simulating Personal Trainer's Tactile and Auditory Guidance},
  year = {2023},
  isbn = {9798400700965},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  url = {https://doi.org/10.1145/3586182.3616644},
  doi = {10.1145/3586182.3616644},
  booktitle = {Adjunct Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology},
  articleno = {14},
  numpages = {3},
  location = {San Francisco, CA, USA},
  series = {UIST '23 Adjunct}
  }
endnote: |
  %0 Conference Paper
  %T TrainerTap: Weightlifting Support System Prototype Simulating Personal Trainer's Tactile and Auditory Guidance
  %@ 9798400700965
  %U https://doi.org/10.1145/3586182.3616644
  %R 10.1145/3586182.3616644
  %B Adjunct Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology
  %I Association for Computing Machinery
  %A Hye-Young Jo
  %A Chan Hu Wie
  %A Yejin Jang
  %A Dong-Uk Kim
  %A Yurim Son
  %A Yoonji Kim
  %D 2023
  %P Article 14
  %K haptic wearable, mind-muscle connection, weightlifting
  %C San Francisco, CA, USA
acmref: |
  Hye-Young Jo, Chan Hu Wie, Yejin Jang, Dong-Uk Kim, Yurim Son, and Yoonji Kim. 2023. TrainerTap: Weightlifting Support System Prototype Simulating Personal Trainer's Tactile and Auditory Guidance. In Adjunct Proceedings of the 36th Annual ACM Symposium on User Interface Software and Technology (UIST '23 Adjunct). Association for Computing Machinery, New York, NY, USA, Article 14, 1–3. https://doi.org/10.1145/3586182.3616644
---


## Problem: solo workouts lack a trainer's quality

Working out alone at the gym rarely matches a session with a personal trainer, in both quality and
intensity. How can we close that gap for people exercising on their own?

## Solution: a wearable that replicates a trainer's touch and voice

A personal trainer taps your body to draw attention to the muscle you should be using, counts reps
aloud, and cheers you on to keep tension through the set. TrainerTap reproduces that tactile and
auditory guidance with three parts:

- a **Y-motion detector** on the bar (a Bluetooth-enabled Bluno Beetle Arduino, coin batteries, and a
  distance sensor) that senses the bar's vertical motion;
- **vibration devices** tucked into gym-clothing pockets (Bluno Beetle + battery + vibration motor)
  that mimic the trainer's tap;
- a **mobile app** that ties the devices together and delivers audio cues.

## Walkthrough

The user picks a target exercise in the app, attaches the detector and places the vibration devices,
then does three warm-up reps so the detector can calibrate their range of motion. From there it tracks
the lift and signals each vibration device, which buzzes in different patterns to cue *which* muscle to
use and *when*, while the app counts reps, guides breathing, and encourages.

![](./system.png)

## The big three lifts

The first prototype supports the big-three lifts, with four vibration devices giving feedback on
primary and secondary muscles. We designed the vibration patterns together with three experienced
trainers.

![](./big-three.png)

