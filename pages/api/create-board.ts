import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]';
import { addBoard } from '@/utils/baserow';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }
        const { boardName, boardDesc } = req.body;
        const userId = session.user.id;
        const boardId = await addBoard(boardName, boardDesc, userId);
        if (boardId) {
            res.json({
                boardName,
                boardId
            })
        } else {
            throw new Error("Board not created");   
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: true
        })
    }
    // TODO accept userId, board name/desc & return boardId
}