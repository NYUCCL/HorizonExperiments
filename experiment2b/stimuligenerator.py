from random import random, shuffle, randint

def trial_generator(numTrials, frequencies, rewardProbs):
    habitatDefinition = []
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
        for k in range(int(counts[i])):
            if random() < rewardProbs[i]:
                outcomes[i].append(1)
            else:
                outcomes[i].append(0)
    cat_counters = [1 for _ in range(numSpecies)]
    for i in range(numTrials):
        category = int(trials.pop())
        theOutcome = outcomes[category].pop()
        if theOutcome:
            approachPayoff = 1
        else:
            approachPayoff = -1
        if i == numTrials - 1:
            degrees = 720 - 360 * .985 - 360 * random() * .015
        else:
            degrees = 720 - (.025 + random() * .95) * 360 * .985
        cat_trial = cat_counters[category]
        cat_counters[category] += 1
        habitatDefinition.append({'habitatTrial': i+1,
                                  'habitatLength': numTrials,
                                  'catTrial': cat_trial,
                                  'freq': frequencies[category],
                                  'probGood': rewardProbs[category],
                                  'cat': category,
                                  'degrees': degrees,
                                  'value': theOutcome,
                                  'apPayoff': approachPayoff,
                                  'avPayoff': 0})
    return habitatDefinition

def experiment_generator():
    num_habitats = 4
    num_trials = [40, 60, 80, 100]
    # num_trials = [20, 20, 20, 20]
    frequencies = [[.1, .1, .4, .4] for _ in range(4)]
    reward_probs = []
    goods_per_hab = [[0, 0] for _ in range(4)]
    goods_left_per_freq = [4, 4]
    # make sure there's at least one good species in each habitat
    for i in range(4):
        r = randint(0,1)
        goods_per_hab[i][r] = 1
        goods_left_per_freq[r] -= 1
    # distribute the rest of the good species
    for i in range(2):
        while goods_left_per_freq[i] > 0:
            r = randint(0,3)
            if goods_per_hab[r][i] < 2:
                goods_per_hab[r][i] += 1
                goods_left_per_freq[i] -= 1
    # turn the number of goods into the actual values of the species
    for i in range(4):
        hab_rewards = []
        for j in range(2):
            if goods_per_hab[i][j] == 1:
                if randint(0, 1):
                    hab_rewards += [.33, .67]
                else:
                    hab_rewards += [.67, .33]
            elif goods_per_hab[i][j] == 2:
                hab_rewards += [.67, .67]
            else:
                hab_rewards += [.33, .33]
        reward_probs.append(hab_rewards)

    exp_definition = []
    for h in range(num_habitats):
        exp_definition.append(trial_generator(num_trials[h],
                                             frequencies[h],
                                             reward_probs[h]))
    shuffle(exp_definition)
    trial_num = 1
    for h in range(num_habitats):
        for i in range(len(exp_definition[h])):
            exp_definition[h][i]['trial'] = trial_num
            exp_definition[h][i]['habitatNum'] = h
            trial_num += 1
    return exp_definition
