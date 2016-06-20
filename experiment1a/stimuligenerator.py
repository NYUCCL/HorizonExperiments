from random import random, shuffle

#generate all stimuli for single mushroom tasks
def stage_generator(counterbalance, numTasks, numTrials, rewardProb, healthGain, poisonCost, avoidCost, block_length):
    exp_definition = []
    trial_num = 1
    #shift reward probabilities so matching between lengths and rewards is counterbalanced
    rewardProb = rewardProb[counterbalance:] + rewardProb[:counterbalance]

    #experiment is split into stages with info given in numTrials and rewardProb
    patch_num = 0
    #order of patches. This is randomized so visit different length patches in different orders
    #we're only shuffling them within four blocks here. So we're actually assuming the length is 24...
    patch_order = []
    for i in range(0,numTasks/block_length):
        block = range(i*block_length, i*block_length + block_length)
        shuffle(block)
        patch_order += block

    for stage in patch_order:
        patch_num += 1
        block_definition = []
        outcomes = []
        for i in range(numTrials[stage]):
            if random() < rewardProb[stage]:
                outcome = 1
                approachPayoff = healthGain
            else:
                outcome = 0
                approachPayoff = poisonCost
            block_definition.append({'counterbalance': counterbalance,
                                     'globalTrial': trial_num,
                                     'blockTrial': i+1,
                                     'blockTrialsLeft': numTrials[stage] - (i+1),
                                     'patchNum': patch_num,
                                     'patchLength': numTrials[stage],
                                     'probGood': rewardProb[stage],
                                     'value': outcome,
                                     'apPayoff': approachPayoff,
                                     'avPayoff': avoidCost})
            trial_num += 1
        exp_definition.append(block_definition)
    return exp_definition

# python function which partially mimics behavior of ExperimentGenerator from 4 mushroom experiment for cogsci 2014
def trial_generator(numTrials, frequencies, rewardProbs):
    expDefinition = []
    numSpecies = len(frequencies)
    trials = []
    cumulativeFreqs = [frequencies[0]]
    cumulativeCounts = [round(cumulativeFreqs[0]*numTrials)]
    counts = [cumulativeCounts[0]]
    for j in range(numSpecies-1):
        cumulativeFreqs.append(cumulativeFreqs[j] + frequencies[j+1])
        cumulativeCounts.append(round(cumulativeFreqs[j+1]*numTrials))
        counts.append(cumulativeCounts[j+1] - cumulativeCounts[j])
    trials = [i for i in range(len(counts)) for k in range(int(counts[i]))]
    shuffle(trials)
    if len(trials) != numTrials:
        print "number of trials wrong"
    outcomes = []
    for i in range(numSpecies):
        outcomes.append([])
        numGood = round(counts[i]*rewardProbs[i])
        for k in range(int(counts[i])):
            if random() < rewardProbs[i]:
                outcomes[i].append(1)
            else:
                outcomes[i].append(0)
        # for k in range(int(counts[i])):
        #     if k < numGood:
        #         outcomes[i].append(1)
        #     else:
        #         outcomes[i].append(0)
        # shuffle(outcomes[i])
    # keep track of trial number within each category
    # (not done in real experiment but should have)
    cat_counters = [1 for _ in range(numSpecies)]
    for i in range(numTrials):
        category = int(trials.pop())
        theOutcome = outcomes[category].pop()
        if theOutcome:
            approachPayoff = 1
        else:
            approachPayoff = -1
        cat_trial = cat_counters[category]
        cat_counters[category] += 1
        expDefinition.append({'trial': i+1,
                              'cat_trial': cat_trial,
                              'freq': frequencies[category],
                              'probGood': rewardProbs[category],
                              'cat': category,
                              'value': theOutcome,
                              'apPayoff': approachPayoff,
                              'avPayoff': 0})
    return expDefinition



def main():
    print stage_generator(2, [2,4], [0.2,0.8], 0.05, -0.05, 0)

if __name__ == '__main__':
    main()
