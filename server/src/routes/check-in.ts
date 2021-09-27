const { Router } = require('express');
const router = Router();
const { getCheckinList } = require('../contollers/check-in');
const { addUserLocation } = require('../contollers/check-in');
const { updateCurrentUserLocation } = require('../contollers/check-in');
const { addRandomUserLocations } = require('../contollers/check-in')

router.route('/checkins')
    .get(getCheckinList)
    .post(addUserLocation);

router.route('/checkins/:id')
    .put(updateCurrentUserLocation);

router.route('/checkins/all')
    .post(addRandomUserLocations);


module.exports = router;