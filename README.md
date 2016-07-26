# screeps.behaviour-action-pattern
Behaviour-Action Pattern for "Screeps" Game @ https://screeps.com/

###Readme V1 still under construction...

- [x] TOC
- [x] Intro
- [ ] Creep Types
- [ ] Actions
- [ ] Settings
- [ ] Status

## Contents

**1. Description**

  About this repository and background of the general approach

**2. Creep Types**

  Description of Setup & Behaviour of each Creep types. 
  1. Worker
  2. Melee
  3. Ranger
  4. Healer
  5. Claimer
  6. Pioneer

**3. Actions**

  Description of each Action a creep can do
  1. Building
  2. Claiming
  3. Defending
  4. Feeding
  5. Fueling
  6. Guarding
  7. Harvesting
  8. Healing
  9. Idle
  10. Invading
  11. Picking
  12. Repairing
  13. Settling
  14. Storing
  15. Upgrading
  16. Withdrawing

**4. Settings & Tuning**

  1. Params

    List of global parameters
  2. How to adjust Population

    ( e.g. of workers or guards )

**5. Current State & Perspective**




##1. Description

This repository contains code for [Screeps](https://screeps.com/), a game where you have to develop code to control minions (creeps). 
I will not explain the game any further - just go there and have your own look at it. 

After playing the tutorial and doing the first steps on my own, I thought of a better approach than the simple fixed role pattern presented in the tutorial. 
Every creep is determinated and limited by its body parts, as they can't be changed once a creep has been build. This setting defines the general creep type. 

A certain creep type needs two aspects to take care of: *Setup* and *Behaviour*.

__*Setup*__ coordinates which and how many body parts exactly and how many creeps of the type are when to be build.

__*Behaviour*__ defines what the creep should do once it's build. 

While the behaviour of each creep type may be completely different, each single activity a creep does can be described regardless of its type or behaviour and different creep types may also do the same actions (e.g. move to a flag in a different room or be idle and wait one loop). 
In other words: *Behaviour* defines which *Action* has to be done, respecting the current situation, and is tailored to the creeps body.  

__*Action*__ describes a certain order or task a single creep is currently working at. 

##2. Creep Types

The list of creep types reflects only the current state of development and is surely not complete. On the other hand it's also a matter of taste, valuation or experience which and how or how many different creeps are needed. So this list may never be complete. 

Some words to the spawning and sizing of creeps: 
The spawn will always try to build as many and as big creeps as possible (in the current loop). Thus each Setup contains limitations how big or how many creeps it is allowed to produce. 

A regular probe of the spawn will occur every 10 loops. It will then check if it's possible to produce a new creep using this order: 
/1. worker
/2. claimer
/3. pioneer (not yet)
/4. melee
/5. ranger
/6. healer (not yet)

Some words about target assignment for Actions: 
An Action can only be assigned, if there is also a valid target. Most Actions limit target assignments to a certain amount of max creeps (e.g. only one creep per construction site).

  1. Worker

    The worker is the most important unit, which will be able to do most of the work to establish your base and infrastructure.

    * __Setup__

      *Body:* An equal amount of CARRY, WORK & MOVE parts. Currently limited to up to 6 of each part.

      *Spawning:* 
        * There should always be workers in the (owned) room. 
        * The total amount is limited to a total count wich is be calculated considering the number of sources and their "accessible fields", which is the number of walkable fields next to a source. 
          Current formula is: `(spawn.room.sourceAccessibleFields * 1.2) + (spawn.room.sources.length * 2)` 
        * The total weight (energy cost of all workers in the room) is also limited considering the amount of sources.
          Current Formula is: `spawn.room.sources.length * 3000`
        * Will not spawn if energyAvailable (Spawn + Extensions) is below 50%

    * __Behaviour__

      * The creep will always check if it has a memorized action and if its target is still valid. Otherwise it will demand a new order. 
      * Action assignment will take energy carried into account and be different when there are enemy creeps present in the room. 
      * To assigning a new action, a certain order of possible actions will be probed and the first valid action will be assigned. 
      * To differenciate beyond the flat list of priorities, each Action has its own limitations when it is valid. e.g. storing is only valid when there is at least one creep already upgrading etc.

      * __Current Action priority__
        * Carrying no energy and no enemy creeps present
          * Picking
          * Harvesting
          * Withdrawing
          * Idle
        * Carrying no energy and enemy creeps present
          * Withdrawing
          * Harvesting
          * Idle
        * Carrying some energy and no creeps present
          * Picking
          * Feeding
          * Repairing (urgents)
          * Building
          * Storing
          * Upgrading
          * Idle
        * Carrying some energy and enemy creeps present
          * Feeding
          * Fueling
          * Repairing (urgents)
          * Building
          * Storing
          * Upgrading
          * Idle


*// TODO*

  2. Melee
  3. Ranger
  4. Healer
  5. Claimer
  6. Pioneer

##3. Actions

*// TODO*

##4. Settings & Tuning 

*// TODO*

##5. Current State & Perspective

*// TODO*