import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]';
import { getBoardData, getBoardRowId, updateBoard } from '@/utils/baserow';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }
        const { boardId } = req.body;
        const userId = session.user.id;
        const boardRowId = await getBoardRowId(userId, boardId);
        if (boardRowId) {
            const boardData = await getBoardData(boardRowId)
            res.json({
                boardData
            })
        } else {
            throw new Error("Board not found");
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: true
        })
    }
    // TODO accept userId, boardId & return board data

}