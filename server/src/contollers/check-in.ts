const CheckIns = require('../models/CheckIn')
import { Request, Response, NextFunction } from 'express';
const uuid = require('uuid');




// @desc Get only near check-ins by the current user
// @route GET /api/checkins
exports.getCheckinList = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // find user  coordinates 
        const currentUser = await CheckIns.find({ id: 2 });
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

// @desc  get all users checkin data
// @route POST /api/checkins/all
exports.getAllCheckins =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userCheckinData = await CheckIns.find();
        return res.status(201).json({
            success: true,
            data: userCheckinData
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
        
    }
}

// @desc  add randoum user checkins data
// @route POST /api/checkins/all
exports.addRandomUserLocations = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: any = [
            {
                "id": uuid.v1(),
                "name": "Liza12",
                "location": {
                    "coordinates": [40.157817, 44.523241]
                }
            },
            {
                "id": uuid.v1(),
                "name": "Shogher15",
                "location": {
                    "coordinates": [40.158612, 44.520752]

                },
            },
            {
                "id": uuid.v1(),
                "name": "Davit34",
                "location": {
                    "coordinates": [40.158874, 44.517405]

                },
            },
            {
                "id": uuid.v1(),
                "name": "Sargis34",
                "location": {
                    "coordinates": [40.197095, 44.493271]

                },
            },
            {
                "id": uuid.v1(),
                "name": "Anna67",
                "location": {
                    "coordinates": [40.193753, 44.497516]

                },
            }

        ]

        const userData = await CheckIns.create(data);
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

