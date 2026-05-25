---
title: "TrainerTap: Weightlifting Support System Simulating a Personal Trainer's Tactile and Auditory Guidance"
type: "research"
year: 2023
authors: ["Hye-Young Jo", "Chan Hu Wie", "Yejin Jang", "Dong-Uk Kim", "Yurim Son", "Yoonji Kim"]
venue: "ACM UIST (Adjunct)"
abstract: "TrainerTap is a weightlifting support prototype that simulates a personal trainer's tactile and auditory guidance — tapping target muscles to direct attention and giving auditory tempo cues — so solo lifters feel a trainer's presence."
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
---


## Problem — solo workouts lack a trainer's quality

Working out alone at the gym rarely matches a session with a personal trainer, in both quality and
intensity. How can we close that gap for people exercising on their own?

## Solution — a wearable that replicates a trainer's touch and voice

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
use and *when* — while the app counts reps, guides breathing, and encourages.

![](./system.png)

## The big three lifts

The first prototype supports the big-three lifts, with four vibration devices giving feedback on
primary and secondary muscles. We designed the vibration patterns together with three experienced
trainers.

![](./big-three.png)

