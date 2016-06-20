# this file imports custom routes into the experiment server

from flask import Blueprint, render_template, request, jsonify, Response, abort, current_app
from jinja2 import TemplateNotFound
from functools import wraps
from sqlalchemy import or_

from psiturk.psiturk_config import PsiturkConfig
from psiturk.experiment_errors import ExperimentError
from psiturk.user_utils import PsiTurkAuthorization

# # Database setup
from psiturk.db import db_session, init_db
from psiturk.models import Participant
from json import dumps, loads

from stimuligenerator import stage_generator

# load the configuration options
config = PsiturkConfig()
config.load_config()
myauth = PsiTurkAuthorization(config)  # if you want to add a password protect route use this

# explore the Blueprint
custom_code = Blueprint('custom_code', __name__, template_folder='templates', static_folder='static')



###########################################################
#  serving warm, fresh, & sweet custom, user-provided routes
#  add them here
###########################################################

#----------------------------------------------
# example custom route
#----------------------------------------------
@custom_code.route('/my_custom_view')
def my_custom_view():
	try:
		return render_template('custom.html')
	except TemplateNotFound:
		abort(404)

#----------------------------------------------
# example using HTTP authentication
#----------------------------------------------
@custom_code.route('/my_password_protected_route')
@myauth.requires_auth
def my_password_protected_route():
	try:
		return render_template('custom.html')
	except TemplateNotFound:
		abort(404)

#----------------------------------------------
# example accessing data
#----------------------------------------------
@custom_code.route('/view_data')
@myauth.requires_auth
def list_my_data():
        users = Participant.query.all()
	try:
		return render_template('list.html', participants=users)
	except TemplateNotFound:
		abort(404)

#----------------------------------------------
# get stimuli for experiment
#----------------------------------------------
@custom_code.route('/get_stims', methods=['GET'])
def get_stims():
    current_app.logger.info("accessing route /get_stims")
    #get all the parameters for the stim generator from the request
    trials = stage_generator(int(request.args['counterbalance']),
                             int(request.args['num_patches']),
                             [int(item) for item in request.args.getlist('habitat_lengths[]')],
                             [float(item) for item in request.args.getlist('reward_probs[]')],
                             float(request.args['health_gain']),
                             float(request.args['poison_cost']),
                             float(request.args['avoid_cost']),
                             int(request.args['block_length']))
    return jsonify(results=trials)


#----------------------------------------------
# example computing bonus
#----------------------------------------------

@custom_code.route('/compute_bonus', methods=['GET'])
def compute_bonus():
    current_app.logger.info("accessing route /compute_bonus")
    # check that request includes a uniqueId
    if not request.args.has_key('uniqueId'):
        raise ExperimentError('improper_inputs')  # i don't like returning HTML to JSON requests...  maybe should change this
    uniqueId = request.args['uniqueId']
    try:
        # lookup user in database
        user = Participant.query.\
               filter(Participant.uniqueid == uniqueId).\
               one()
        user_data = loads(user.datastring) # load datastring from JSON
        bonuses = []
        for record in user_data['data']: # for line in data file
            trial = record['trialdata'] # get part of line holding trial info
            if trial['phase']=='apavPhase' and trial['globalTrial']==252:
                    user.bonus = float(trial['scoreAfter']) #set bonus field to the final bonus
        db_session.add(user)
        db_session.commit() #commit to database
        resp = {"bonusComputed": "success"}
        return jsonify(**resp)
    except:
        abort(404)  # again, bad to display HTML, but...
