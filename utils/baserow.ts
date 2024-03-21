import axios from "axios"

const authCreds = {
    accountTableId: parseInt(process.env.ACCOUNT_TABLE_ID!),
    sessionTableId: parseInt(process.env.SESSION_TABLE_ID!),
    userTableId: parseInt(process.env.USER_TABLE_ID!),
    boardTableId: parseInt(process.env.BOARD_TABLE_ID!),
    dbToken: process.env.DB_TOKEN!
}

const { accountTableId, dbToken, sessionTableId, userTableId, boardTableId } = authCreds

export async function getUserRowId(userId: string): Promise<number | null> {
    try {
        const filterParam = {
            "filter_type": "AND",
            "filters": [
                {
                    "type": "equal",
                    "field": "userId",
                    "value": userId
                }
            ],
            "groups": [

            ]
        }
        const encodedFilter = encodeURIComponent(JSON.stringify(filterParam))
        const userData = await axios({
            method: "GET",
            url: `https://api.baserow.io/api/database/rows/table/${userTableId}/?user_field_names=true&filters=${encodedFilter}`,
            headers: {
                Authorization: `Token ${dbToken}`
            }
        })
        return userData.data.results[0].id
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function addBoard(boardName: string, boardDesc: string, userId: string): Promise<string | null> {
    try {
        const newBoard = await axios({
            method: "POST",
            url: `https://api.baserow.io/api/database/rows/table/${boardTableId}/?user_field_names=true`,
            headers: {
                Authorization: `Token ${dbToken}`,
                "Content-Type": "application/json"
            },
            data: {
                boardName,
                boardDesc,
                userId
            }
        })
        return newBoard.data.boardId
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getBoardRowId(userId: string, boardId: string): Promise<number | null> {
    try {
        const filterParam = {
            "filter_type": "AND",
            "filters": [
                {
                    "type": "equal",
                    "field": "userId",
                    "value": userId
                },
                {
                    "type": "equal",
                    "field": "boardId",
                    "value": boardId
                }
            ],
            "groups": [

            ]
        }
        const encodedFilter = encodeURIComponent(JSON.stringify(filterParam))
        const boardData = await axios({
            method: "GET",
            url: `https://api.baserow.io/api/database/rows/table/${boardTableId}/?user_field_names=true&filters=${encodedFilter}`,
            headers: {
                Authorization: `Token ${dbToken}`
            }
        })
        return boardData.data.results[0].id
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function updateBoard(rowId: number, data: string): Promise<boolean | null> {
    try {
        const updatedBoardData = await axios({
            method: "PATCH",
            url: `https://api.baserow.io/api/database/rows/table/${boardTableId}/${encodeURIComponent(rowId)}/?user_field_names=true`,
            headers: {
                Authorization: `Token ${dbToken}`,
                "Content-Type": "application/json"
            },
            data: {
                data
            }
        })
        console.log("updated board data")
        console.log(updatedBoardData.data)
        return true
    } catch (error) {
        console.error(error)
        return null
    }
}

export async function getBoardData(boardRowId: number): Promise<string | null> {
    try {
        const boardData = await axios({
            method: "GET",
            url: `https://api.baserow.io/api/database/rows/table/${boardTableId}/${boardRowId}/?user_field_names=true`,
            headers: {
                Authorization: `Token ${dbToken}`
            }
        })

        return boardData.data.data
    } catch (error) {
        console.error(error)
        return null
    }
}

interface BasicBoardData {
    boardId: string;
    boardName: string;
}
export async function getAllBoards(userId: string): Promise<BasicBoardData[]> {
    try {
        const filterParam = {
            "filter_type": "AND",
            "filters": [
                {
                    "type": "equal",
                    "field": "userId",
                    "value": userId
                }
            ],
            "groups": []
        }
        const encodedFilter = encodeURIComponent(JSON.stringify(filterParam))
        const resp = await axios({
            method: "GET",
            url: `https://api.baserow.io/api/database/rows/table/${boardTableId}/?user_field_names=true&filters=${encodedFilter}&include=boardId,boardName,userId`,
            headers: {
                Authorization: `Token ${dbToken}`
            }
        })
        const boardList: BasicBoardData[] = resp.data.results.map((board: any) => {
            return {
                boardId: board.boardId,
                boardName: board.boardName
            }
        })
        return boardList
    } catch (error) {
        console.error(error)
        return []
    }
}