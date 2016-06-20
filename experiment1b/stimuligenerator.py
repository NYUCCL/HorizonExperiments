from random import random, shuffle


def stage_generator(num_patches, patch_length_types, reward_prob_types,
                    healthgain, poisoncost, avoidcost):
    patches_per_length = num_patches / len(patch_length_types)
    rewards_per_length =  patches_per_length / len(reward_prob_types)
    rewards = []
    for i in range(len(patch_length_types)):
        one_patch_rewards = reward_prob_types * rewards_per_length
        shuffle(one_patch_rewards)
        rewards.append(one_patch_rewards)

    patch_lengths = []
    patch_rewards = []
    # create b "blocks" of one patch of each length
    for b in range(patches_per_length):
        order = range(len(patch_length_types))
        shuffle(order)
        for i in order:
            patch_lengths.append(patch_length_types[i])
            patch_rewards.append(rewards[i][b])
    exp_definition = []
    global_trial_num = 1
    for p in range(num_patches):
        patch_definition = []
        num_trials = patch_lengths[p]
        reward_prob = patch_rewards[p]
        for i in range(num_trials):
            if random() < reward_prob:
                outcome = 1
                approachpayoff = healthgain
            else:
                outcome = 0
                approachpayoff = poisoncost
            patch_definition.append({'globalTrial': global_trial_num,
                                     'catTrial': i+1,
                                     'catTrialsleft': num_trials - (i+1),
                                     'patchNum': p,
                                     'patchLength': num_trials,
                                     'probGood': reward_prob,
                                     'value': outcome,
                                     'apPayoff': approachpayoff,
                                     'avPayoff': avoidcost})
            global_trial_num += 1
        exp_definition.append(patch_definition)
    return exp_definition


def experiment_generator():
    numpatches = 24
    habitatlengths = [1, 2, 4, 8, 16, 32]
    rewardprobabilities = [.33, .67]
    healthgain = 1
    poisoncost = -1
    avoidcost = 0
    return stage_generator(numpatches, habitatlengths, rewardprobabilities,
                           healthgain, poisoncost, avoidcost)
