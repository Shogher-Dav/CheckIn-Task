const CheckIns = require('../models/CheckIn')
import { Request, Response, NextFunction } from 'express';
const uuid = require('uuid');




// @desc Get only near check-ins by the current user
// @route GET /api/checkins
exports.getCheckinList = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const name = req.params.name;
        if (name) {
            // find user  coordinates 
            const currentUser = await CheckIns.find({ name: name });
            const currentUserCoordinates = currentUser[0].location.coordinates;
            // find near user location checkins compared to the current user
            const checkIns = await CheckIns.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point", coordinates: currentUserCoordinates
                        },
                        distanceField: "dist.calculated",
                        maxDistance: 1000,
                        includeLocs: "dist.location",
                        spherical: true,
                        distanceMultiplier: 0.001,
                    }
                },
                { $sort: { 'createdAt': -1 } },
            ]);

            return res.status(200).json({
                success: true,
                count: checkIns.length,
                data: checkIns
            });
        }

        return res.status(200).json({
            success: true,
            count: 0,
            data: null
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: `Server error - ${e}`
        })
    }
}


// @desc  Add a location
// @route POST /api/checkins
exports.addUserLocation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idObj =
        {
            id: uuid.v1()
        }
        const currentUser = Object.assign(req.body, idObj)

        const userData = await CheckIns.create(currentUser);
        return res.status(201).json({
            success: true,
            data: userData
        });
    } catch (err: any) {
        console.error(err);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'This user is  already exists' });
        }
        res.status(500).json({ error: 'Server error' });
    }
}



// @desc  Update current user  location
// @route PUT /api/checkins/id
exports.updateCurrentUserLocation = async (req: Request, res: Response, next: NextFunction) => {

    try {


        const userLocation = req.body
        //  get id from request
        const name = req.params.name;
        console.log(name);
        // location type must be added
        userLocation.location.type = 'Point';

        const updateLocation = await CheckIns.updateOne({ name: name }, userLocation);

        return res.status(204).json({
            success: true,
            data: userLocation
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }

}

