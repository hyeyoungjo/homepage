---
title: "GamesBond: Bimanual Haptic Illusion of Physically Connected Objects for Immersive VR Using Grip Deformation"
type: "research"
year: 2021
authors: ["Neung Ryu", "Hye-Young Jo", "Michel Pahud", "Mike Sinclair", "Andrea Bianchi"]
venue: "ACM CHI"
abstract: "GamesBond creates a bimanual haptic illusion of two physically connected objects in VR using dynamic grip deformation on 4-DoF controllers without any physical linkage. User studies showed enhanced realism, immersion, and enjoyment."
teaser: ./teaser.jpg
teaserAlt: "GamesBond bimanual VR controllers with grip deformation"
tags: ["VR", "haptics", "controllers"]
award: "Honorable Mention"
links:
  pdf: "https://drive.google.com/file/d/15g2cdwuwwMAk6vLFfNet8wQNYtnZzPZS/view"
  doi: "https://doi.org/10.1145/3411764.3445727"
  youtube: "https://youtu.be/0f3wAVNglsk"
  preview: "https://youtu.be/ARsFX-hGAfk"
  presentation: "https://youtu.be/YXd-a0asYJ0"
featured: false
draft: false
bibtex: |
  @inproceedings{10.1145/3411764.3445727,
  author = {Ryu, Neung and Jo, Hye-Young and Pahud, Michel and Sinclair, Mike and Bianchi, Andrea},
  title = {GamesBond: Bimanual Haptic Illusion of Physically Connected Objects for Immersive VR Using Grip Deformation},
  year = {2021},
  isbn = {9781450380966},
  publisher = {Association for Computing Machinery},
  address = {New York, NY, USA},
  url = {https://doi.org/10.1145/3411764.3445727},
  doi = {10.1145/3411764.3445727},
  booktitle = {Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems},
  articleno = {125},
  numpages = {10},
  location = {Yokohama, Japan},
  series = {CHI '21}
  }
endnote: |
  %0 Conference Paper
  %T GamesBond: Bimanual Haptic Illusion of Physically Connected Objects for Immersive VR Using Grip Deformation
  %@ 9781450380966
  %U https://doi.org/10.1145/3411764.3445727
  %R 10.1145/3411764.3445727
  %B Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems
  %I Association for Computing Machinery
  %A Neung Ryu
  %A Hye-Young Jo
  %A Michel Pahud
  %A Mike Sinclair
  %A Andrea Bianchi
  %D 2021
  %P Article 125
  %K Haptics, Virtual Reality, bimanual interaction, grip deformation, shape-changing
  %C Yokohama, Japan
acmref: |
  Neung Ryu, Hye-Young Jo, Michel Pahud, Mike Sinclair, and Andrea Bianchi. 2021. GamesBond: Bimanual Haptic Illusion of Physically Connected Objects for Immersive VR Using Grip Deformation. In Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems (CHI '21). Association for Computing Machinery, New York, NY, USA, Article 125, 1–10. https://doi.org/10.1145/3411764.3445727
---


## Problem: mechanical links between controllers are rigid and unremovable

To give both hands the feeling of holding one object in VR, previous work physically linked two
controllers with a mechanism that renders adjustable stiffness. But a physical link restricts
movement, can't be removed for free motion, and can't keep up with highly dynamic objects with many
degrees of freedom, like a jumping rope swung between the hands.

## Solution: a "virtual bond" from grip deformation

GamesBond is a pair of 4-DoF controllers with *no* physical link between them that still create the
haptic illusion of a single connected object. Each handle mechanically bends, twists, and stretches;
those kinesthetic deformations of the skin make both hands feel one coordinated motion, a virtual
bond.

![](./system.gif)

## Applications

By rendering different grip deformations, the controllers can simulate a range of immersive
two-handed experiences: a jumping rope, the illusion of force, and various rigid grip shapes. A user
study showed GamesBond increased the realism, immersion, and enjoyment of bimanual interaction.

![](./application.gif)

