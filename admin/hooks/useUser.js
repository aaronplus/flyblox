import { useState } from "react"
import UserRepository from "~/repositories/UserRepository"

export default function useGetUser() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState(null)
  const [usersCount, setUsersCount] = useState(null)
  const [usersDaysCount, setUsersDaysCount] = useState(null)
  const [usersWeeksCount, setUsersWeeksCount] = useState(null)
  const [loadingForUsers, setLoadingForUsers] = useState(false)
  return {
    loading,
    users,
    usersCount,
    usersDaysCount,
    usersWeeksCount,
    loadingForUsers,

    setUsers: (payload) => {
      setUsers(payload)
    },

    setLoading: (payload) => {
      setLoading(payload)
    },

    setLoadingForUsers: (payload) => {
      setLoadingForUsers(payload)
    },

    setUsersCount: (payload) => {
      setUsersCount(payload)
    },

    setUsersDaysCount: (payload) => {
      setUsersDaysCount(payload)
    },

    setUsersWeeksCount: (payload) => {
      setUsersWeeksCount(payload)
    },

    getUsers: async (title_contains) => {
      let responseData
      responseData = await UserRepository.getUsers({ title_contains })
      if (responseData && responseData.data) {
        setTimeout(
          function () {
            setLoading(false)
            setUsers(responseData.data.users)
          }.bind(this),
          250
        )
      } else {
        setLoading(false)
      }
    },

    getUsersCount: async () => {
      let responseData
      responseData = await UserRepository.getUsersCount()
      if (responseData && responseData.data) {
        setTimeout(
          function () {
            setLoadingForUsers(false)
            setUsersCount(responseData.data.results)
            setUsersDaysCount(responseData.data.days)
            setUsersWeeksCount(responseData.data.weeks)
          }.bind(this),
          250
        )
      } else {
        setLoadingForUsers(false)
      }
    },

    updateUser: async (payload) => {
      let responseData
      responseData = await UserRepository.updateUser(payload)
      if (responseData) {
        return responseData
      } else {
        return null
      }
    },
  }
}
