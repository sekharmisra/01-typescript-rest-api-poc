import express from 'express';

import { get, merge } from 'lodash';

import { getUserBySessionToken } from '../db/users';

export const isAuthenticated  = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{

        const sessionToken = req.cookies['SEKHAR-AUTH'];

        if(!sessionToken){
            return res.sendStatus(403);
        }

        const existingUser = getUserBySessionToken(sessionToken);

        if(!existingUser){
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser});

        return next();

    } catch(error){
        return res.sendStatus(400);
    }
}

export const isOwner  = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;
        console.log(currentUserId);

        if (!currentUserId){
            console.log("!currentUserId");
            return res.sendStatus(403);
        }

        if (currentUserId.toString() !== id){
            console.log("currentUserId.toString() !== id");
            return res.sendStatus(403);
        }      
        next();

    } catch(error){
        return res.sendStatus(400);
    }
}
