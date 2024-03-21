import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]';
import { getAllBoards, getBoardData, getBoardRowId } from '@/utils/baserow';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(401).json({ message: "You must be logged in." });
            return;
        }
        const userId = session.user.id;
        const boardList = await getAllBoards(userId);

        res.json({
            boardList
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: true
        })
    }
    // TODO accept userId, return boardname, boardid
}