import faunadb, {query as q} from 'faunadb'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const client = new faunadb.Client({secret: process.env.REACT_APP_FAUNA_KEY})

export  const createUser = async (firstName, lastName, email, password) => {
  password = await bcrypt.hash(password, bcrypt.genSaltSync(10))
  console.log(password)
  let newUser = await client.query(
    q.Create(
      q.Collection('users'),
      {
        data: {
          firstName, 
          email, 
          lastName, 
          password
        }
      }
    )
  )
  if (newUser.name === 'BadRequest') return
  newUser.data.id = newUser.ref.value.id
  return newUser.data
}

export const getUser = async (userId) => {
  const userData = await client.query(
    q.Get(
      q.Ref(q.Collection('users'), userId)
    )
  )
  if (userData.name === "NotFound") return
  if (userData.name === "BadRequest") return "Something went wrong"
  return userData.data
}

export const loginUser = async (email, password) => {
  let userData = await client.query(
    q.Get(
      q.Match(q.Index('user_by_email'), email)
    )
  )
  if (userData.name === "NotFound") return
  if (userData.name === "BadRequest") return "Something went wrong"
  userData.data.id = userData.ref.value.id
  if (bcrypt.compareSync(password, userData.data.password)) return userData.data
  else return
}

export const createPassword = async (accountName, accountUrl, email, password, userId) => {
  let user = await getUser(userId)
  console.log(user)
  const date = new Date()
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  let newPassword = await client.query(
    q.Create(
      q.Collection('passwords'),
      {
        data: {
          accountName,
          accountUrl,
          email,
          password,
          created__at: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
          user: {
            name:user.name, 
            email: user.email, 
            id: user.id
          }
        }
      }
    )
  )
  if (newPassword.name === 'BadRequest') return
  newPassword.data.id = newPassword.ref.value.id
  return newPassword.data
}

export const getPasswordsByUserID = async id => {
  try {
    let userPasswords = await client.query(
      q.Get(
        q.Match(q.Index('user_passwords'), id)
      )
    )
    console.log(userPasswords )
    console.log(userPasswords)
    if (userPasswords.name === "NotFound") return
    if (userPasswords.name === "BadRequest") return "Something went wrong"
    userPasswords.data.id = userPasswords.ref.value.id
    console.log(userPasswords)
    return userPasswords.data
  } catch (error) {
    return
  }
}

export const getPassword = async id => {
  let password = await client.query(
    q.Get(q.Ref(q.Collection('passwords'), id))
  )
  if (password.name === "NotFound") return
  if (password.name === "BadRequest") return "Something went wrong"
  password.data.id = password.ref.value.id
  return password.data
}

export const updatePassword = async (payload, id) => {
  let password = await client.query(
    q.Update(
      q.Ref(q.Collection('Passwords'), id),
      {data: {payload}}
    )
  )
  if (password.name === "NotFound") return
  if (password.name === "BadRequest") return "Something went wrong"
  password.data.id = password.ref.value.id
  return password.data
}

export const deletePassword = async (payload, id) => {
  let password = await client.query(
    q.Delete(
      q.Ref(q.Collection('Passwords'), id),
      {data: {payload}}
    )
  )
  if (password.name === "NotFound") return
  if (password.name === "BadRequest") return "Something went wrong"
  password.data.id = password.ref.value.id
  return password.data
}