/** @return { import("next-auth/adapters").Adapter } */

import axios from "axios";

interface BaserowAdapterOpts {
  userTableId: number;
  accountTableId: number;
  sessionTableId: number;
  dbToken: string;
}
export default function BaserowAdapter(options: BaserowAdapterOpts): import("next-auth/adapters").Adapter {
  const { accountTableId, sessionTableId, userTableId, dbToken } = options;
  return {
    async createUser(user) {
      // console.log("creating user")
      // console.log(user)
      const resp = await axios({
        method: "POST",
        url: `https://api.baserow.io/api/database/rows/table/${userTableId}/?user_field_names=true`,
        headers: {
          Authorization: `Token ${dbToken}`,
          "Content-Type": "application/json"
        },
        data: {
          "name": user?.name ?? "",
          "email": user.email,
          "image": user?.image ?? "",
        }
      })
      // console.log("create user resp data")
      // console.log(resp.data)
      // console.log("returned user id")
      // console.log(resp.data?.userId)

      return {
        ...user,
        id: resp.data?.userId
      }
    },
    async getUser(id) {
      // console.log("get user")
      // console.log(id)
      const filterParam = {
        "filter_type": "AND",
        "filters": [
          {
            "type": "equal",
            "field": "userId",
            "value": id
          }
        ],
        "groups": [

        ]
      }
      const encodedFilter = encodeURIComponent(JSON.stringify(filterParam))
      const resp = await axios({
        method: "GET",
        url: `https://api.baserow.io/api/database/rows/table/${userTableId}/?user_field_names=true&filters=${encodedFilter}`,
        headers: {
          Authorization: `Token ${dbToken}`
        }
      })
      if (resp.data.result[0]?.id) {
        return {
          email: resp.data?.email,
          id: resp.data?.userId,
          image: resp.data?.image,
          name: resp.data?.name,
          emailVerified: null
        }
      } else {
        return null
      }

    },
    async getUserByEmail(email) {
      // console.log("get user by email")
      // console.log(email)
      const filterParam = {
        "filter_type": "AND",
        "filters": [
          {
            "type": "equal",
            "field": "email",
            "value": email
          }
        ],
        "groups": [

        ]
      }
      const encodedFilter = encodeURIComponent(JSON.stringify(filterParam))
      const resp = await axios({
        method: "GET",
        url: `https://api.baserow.io/api/database/rows/table/${userTableId}/?user_field_names=true&filters=${encodedFilter}`,
        headers: {
          Authorization: `Token ${dbToken}`
        }
      })
      if (resp.data.results[0]?.id) {
        return {
          id: resp.data.results[0]?.userId,
          email: resp.data.results[0]?.email,
          image: resp.data.results[0]?.image,
          name: resp.data.results[0]?.name,
          emailVerified: null
        }
      } else {
        return null
      }

    },
    async getUserByAccount({ providerAccountId, provider }) {
      // console.log("get user by account")
      // console.log(providerAccountId)
      // console.log(provider)
      const filterParam = {
        "filter_type": "AND",
        "filters": [
          {
            "type": "equal",
            "field": "providerAccountId",
            "value": providerAccountId
          },
          {
            "type": "equal",
            "field": "provider",
            "value": provider
          }
        ],
        "groups": [

        ]
      }
      const encodedFilter = encodeURIComponent(JSON.stringify(filterParam))
      const accountData = await axios({
        method: "GET",
        url: `https://api.baserow.io/api/database/rows/table/${accountTableId}/?user_field_names=true&filters=${encodedFilter}`,
        headers: {
          Authorization: `Token ${dbToken}`
        }
      })
      if (accountData.data.results[0]?.userId) {
        const userId = accountData.data.results[0]?.userId

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
        return {
          id: userData.data.results[0]?.userId,
          email: userData.data.results[0]?.email,
          image: userData.data.results[0]?.image,
          name: userData.data.results[0]?.name,
          emailVerified: null
        }
      } else {
        return null
      }

    },
    async updateUser(user) {
      // console.log("uipdate user")
      // console.log(user)
      const userObjKeys = Object.keys((user))
      let newData: any = {}
      for (const key of userObjKeys) { // Use `for...of` for correct iteration
        if (key !== "id" && key !== "emailVerified") {
          newData[key] = (user as any)[key];
        }
      }
      const filterParam = {
        "filter_type": "AND",
        "filters": [
          {
            "type": "equal",
            "field": "userId",
            "value": user.id
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
      const updatedUserData = await axios({
        method: "PATCH",
        url: `https://api.baserow.io/api/database/rows/table/${userTableId}/${encodeURIComponent(userData.data.id)}/?user_field_names=true`,
        headers: {
          Authorization: `Token ${dbToken}`,
          "Content-Type": "application/json"
        },
        data: {
          ...newData
        }
      })

      return {
        email: updatedUserData.data.email,
        emailVerified: null,
        id: updatedUserData.data.userId,
        image: updatedUserData.data.image,
        name: updatedUserData.data.name
      }
    },
    async deleteUser(userId) {
      return
    },
    async linkAccount(account) {
      // console.log("creating account")
      // console.log(account)
      const resp = await axios({
        method: "POST",
        url: `https://api.baserow.io/api/database/rows/table/${accountTableId}/?user_field_names=true`,
        headers: {
          Authorization: `Token ${dbToken}`,
          "Content-Type": "application/json"
        },
        data: {
          ...account
        }
      })
      return
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return
    },
    async createSession({ sessionToken, userId, expires }) {
      // console.log("creating session")
      // console.log("sessiontoken")
      // console.log(sessionToken)
      // console.log("userId")
      // console.log(userId)
      // console.log("expires")
      // console.log(expires)
      const resp = await axios({
        method: "POST",
        url: `https://api.baserow.io/api/database/rows/table/${sessionTableId}/?user_field_names=true`,
        headers: {
          Authorization: `Token ${dbToken}`,
          "Content-Type": "application/json"
        },
        data: {
          sessionToken,
          userId,
          expires: expires.toISOString()
        }
      })
      return {
        sessionToken,
        userId,
        expires
      }
    },
    async getSessionAndUser(sessionToken) {
      try {
        // console.log("get session and user")
      // console.log(sessionToken)
      const filterParam = {
        "filter_type": "AND",
        "filters": [
          {
            "type": "equal",
            "field": "sessionToken",
            "value": sessionToken
          }
        ],
        "groups": []
      }
      // console.log("filter params")
      // console.log(filterParam)
      const encodedFilter = encodeURIComponent(JSON.stringify(filterParam))
      const sessionData = await axios({
        method: "GET",
        url: `https://api.baserow.io/api/database/rows/table/${sessionTableId}/?user_field_names=true&filters=${encodedFilter}`,
        headers: {
          Authorization: `Token ${dbToken}`
        }
      })
      // console.log("session data resp")
      // console.log(sessionData.data.results[0])
      const userId = sessionData.data.results[0]?.userId
      if (userId) {
        // console.log("getting user data after session")
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
        // console.log("userdata resp")
        // console.log(userData)
        return {
          session: {
            expires: (new Date(sessionData.data.results[0]?.expires)),
            sessionToken: sessionData.data.results[0]?.sessionToken,
            userId: sessionData.data.results[0]?.userId
          },
          user: {
            id: userData.data?.results[0]?.userId,
            email: userData.data?.results[0]?.email,
            image: userData.data?.results[0]?.image,
            name: userData.data?.results[0]?.name,
            emailVerified: null
          }
        }
      } else {
        return null
      }
      } catch (error) {
        console.log(error)
        return null
      }
      
    },
    async updateSession(session) {
      // console.log("update session")
      // console.log(session)
      const sessionObjKeys = Object.keys((session))
      let newData: any = {}
      for (const key of sessionObjKeys) {
        newData[key] = (session as any)[key];
      }
      const filterParam = {
        "filter_type": "AND",
        "filters": [
          {
            "type": "sessionToken",
            "field": "email",
            "value": session.sessionToken
          }
        ],
        "groups": []
      }
      const encodedFilter = encodeURIComponent(JSON.stringify(filterParam))
      const sessionData = await axios({
        method: "GET",
        url: `https://api.baserow.io/api/database/rows/table/${sessionTableId}/?user_field_names=true&filters=${encodedFilter}`,
        headers: {
          Authorization: `Token ${dbToken}`
        }
      })
      const sessionId = sessionData.data.results[0].id
      const resp = await axios({
        method: "PATCH",
        url: `https://api.baserow.io/api/database/rows/table/${sessionTableId}/${encodeURIComponent(sessionId)}/?user_field_names=true`,
        headers: {
          Authorization: `Token ${dbToken}`,
          "Content-Type": "application/json"
        },
        data: {
          ...newData
        }
      })

      return {
        expires: resp.data.expires,
        sessionToken: resp.data.sessionToken,
        userId: resp.data.userId
      }
    },
    async deleteSession(sessionToken) {
      return
    },
  }
}