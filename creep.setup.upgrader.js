var setup = new Creep.Setup('upgrader');
setup.multiBody = [WORK, WORK, WORK, MOVE];
setup.fixedBody = [WORK, WORK, CARRY, MOVE];
setup.minAbsEnergyAvailable = 400;
setup.maxMulti = 4;
setup.minEnergyAvailable = function(spawn){
    return 0.5;
};
setup.maxCount = function(spawn){
<<<<<<< HEAD

    if (spawn.room.situation.invasion) return 0;  // Do not create in the middle of a fight

    let getUpgraders = function () {

        let chargeables = spawn.room.chargeablesOut;
        if (spawn.room.storage) chargeables.push(spawn.room.storage);
        
        if (chargeables.length > 0)
            return spawn.room.controller.pos.findInRange(chargeables, 3) ? 1 : 0;
        else return 0;
    };


    if (DEFCON == 2 && setup.EnoughStorageIsAvailableForDefense(spawn)) {
        return getUpgraders();
    }
    else {
        return 0;
    }



=======
    return spawn.room.containerController.length > 0 ? 1 : 0;
>>>>>>> refs/remotes/origin/dev
};
setup.maxWeight = function(spawn){
    return null;
};
module.exports = setup;
