const { Router } = require('express');
const router = Router();
const { getCheckinList } = require('../contollers/check-in');
const { addUserLocation } = require('../contollers/check-in');
const { updateCurrentUserLocation } = require('../contollers/check-in');
const { addRandomUserLocations } = require('../contollers/check-in');
const { getAllCheckins } = require('../contollers/check-in');

router.route('/checkins')
    .post(addUserLocation);

router.route('/checkins/:name')
    .get(getCheckinList)
    .put(updateCurrentUserLocation);



module.exports = router;