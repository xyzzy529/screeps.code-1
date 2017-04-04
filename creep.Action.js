const CreepAction = class extends Action {
    
    getTargetByID(id) {
        return super.getTargetByID(id) || Game.spawns[id] || Game.flags[id];
    };
    
    isAddableAction(creep) {
        return super.isAddableAction(creep) || !creep.room.population || !creep.room.population.actionCount[this.name] || creep.room.population.actionCount[this.name] < this.maxPerAction;
    };
    
    step(creep) {
        if (CHATTY) creep.say(this.name, SAY_PUBLIC);
        let range = creep.pos.getRangeTo(creep.target);
        if (range <= this.targetRange) {
            const workResult = this.work(creep);
            if (workResult !== OK) {
                const tryAction = creep.action;
                const tryTarget = creep.target;
                creep.action = null;
                creep.target = null;
                creep.handleError({errorCode: workResult, action: this, target: creep.target, range, creep});
                return;
            }
            range = creep.pos.getRangeTo(creep.target);
        }
        if (creep.target) {
            if (range > this.targetRange) {
                creep.travelTo(creep.target, {range: this.targetRange});
            } else if (range > this.reachedRange) {
                const direction = creep.pos.getDirectionTo(creep.target);
                const targetPos = Traveler.positionAtDirection(creep.pos, direction);
                if (creep.room.isWalkable(targetPos.x, targetPos.y)) {
                    creep.move(direction);
                } else {
                    creep.travelTo(creep.target, {range: this.reachedRange});
                }
            }
        }
    };
    
    registerAction(creep, target) {
        Population.registerAction(creep, this, target);
        this.onAssignment(creep, target);
    };
    
    onAssignment(creep, target) {
        return ERR_INVALID_ARGS;
    };
    
};
module.exports = CreepAction;
